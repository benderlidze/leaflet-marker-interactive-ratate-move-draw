
L.Polyline = L.Polyline.include({
    getDistance: function (system) {
        // distance in meters
        var mDistanse = 0,
            length = this._latlngs.length;
        for (var i = 1; i < length; i++) {
            mDistanse += this._latlngs[i].distanceTo(this._latlngs[i - 1]);
        }
        return mDistanse;
    }
});

L.customMarker = function (latlng, options) {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;
    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');
    let polyline = null;
    let arrow = null;
    let dropHandlerInitialized = false;
    let runOnce = false;

    let container = document.createElement('div');
    const iconsContainers = []
    let activeItem = true // on zoom it updates the icon by redrawind them and sets icons visible. This flas is to prevent this behavior

    const markerProps = {
        markerId: options.markerId,
        actionName: "",
        position: latlng,
        rotationAngle: options.rotationAngle,
        icons: [],
        line: null,
        pointPosition: options.pointPosition || latlng
    }

    function bearing(from, to) {
        let [lat1, lon1] = from
        let [lat2, lon2] = to
        const radians = Math.PI / 180;
        lat1 *= radians;
        lon1 *= radians;
        lat2 *= radians;
        lon2 *= radians;
        const deltaLon = lon2 - lon1;
        const y = Math.sin(deltaLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
        let bearing = Math.atan2(y, x);
        // Convert from radians to degrees
        bearing = (bearing + 2 * Math.PI) % (2 * Math.PI);
        bearing = bearing * 180 / Math.PI;
        return bearing + 180;
    }

    const CustomMarker = L.Marker.extend({

        options: {
            rotationOrigin: 'center bottom',
            rotationAngle: 0,
            draggingAll: false,
            onDelete: function () { },
            onChange: function () { },
        },

        initialize: function (latlng, options) {
            L.Marker.prototype.initialize.call(this, latlng, options);
            this.options = L.Util.extend(this.options, options);
        },

        onAdd: function (map) {

            console.log('On ADD!!!!');
            L.Marker.prototype.onAdd.call(this, map);

            let { lat, lng } = this.getLatLng();
            let lat1 = lat - 0.000001;
            let lng1 = lng;

            if (this.options.pointPosition) {
                lat1 = this.options.pointPosition.lat;
                lng1 = this.options.pointPosition.lng;
                markerProps.pointPosition = { lat: lat1, lng: lng1 };
            }

            const polylinePoints = [
                [lat, lng],
                [lat1, lng1]
            ];


            polyline = L.polyline(polylinePoints, {
                color: 'blue',
                weight: 3,
                opacity: 1,
                smoothFactor: 1
            }).addTo(map);

            const angle = bearing([lat, lng], [lat1, lng1]);

            arrow = L.marker([lat1, lng1], {
                icon: L.divIcon({
                    className: 'my-div-icon',
                    html: `<img src="icons/circle.svg" style="transform:rotate(${angle}deg);width: 14px; height: 14px;">`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7]
                }),
                draggable: true,
            }).addTo(map);

            arrow.on('drag', function (e) {
                lat1 = e.target.getLatLng().lat;
                lng1 = e.target.getLatLng().lng;
                polyline.setLatLngs([
                    [lat, lng],
                    [lat1, lng1]
                ]);
            });

            arrow.on('dragend', function (e) {
                console.log('e', e);
                lat1 = e.target.getLatLng().lat;
                lng1 = e.target.getLatLng().lng;
                polyline.setLatLngs([
                    [lat, lng],
                    [lat1, lng1]
                ]);

                markerProps.actionName = "Point drag end"
                markerProps.pointPosition = { lat: lat1, lng: lng1 };
                this.options.onChange(markerProps);
            }.bind(this));

            this.on('drop', function (e) {
                console.log('DROP', e);
            });


            this.on('drag', function (e) {

                e.target._applyRotation();
                //update polyline
                lat = this.getLatLng().lat;
                lng = this.getLatLng().lng;

                if (this.options.draggingAll) {
                    lat1 = lat;
                    lng1 = lng;
                }

                polyline.setLatLngs([
                    [lat, lng],
                    [lat1, lng1]
                ]);

                const angle = bearing([lat, lng], [lat1, lng1])
                arrow.setLatLng([lat1, lng1]);
                // arrow.setIcon(L.divIcon({
                //     className: 'my-div-icon',
                //     html: `<img src="icons/circle.svg" style="transform:rotate(${angle}deg);width: 14px; height: 14px;">`,
                //     iconSize: [14, 14],
                // }));
            });

            this.on('dragend', function (e) {
                markerProps.position = this.getLatLng();
                markerProps.actionName = "Marker drag end"
                this.options.onChange(markerProps);
            });

            container.className = 'actions-container';
            container.style = 'display:flex; flex-direction: row; position:absolute; top: -30px;  transform: translate(-50%, 0px); left: 50%; gap:4px;';

            const rotateButton = document.createElement('button');
            rotateButton.className = 'button ';
            rotateButton.innerHTML = '<img src="icons/rotate.svg" style="width:100%;height:100%">';
            rotateButton.addEventListener('mousedown', this._handleRotation.bind(this));

            const closeButton = document.createElement('button');
            closeButton.className = 'button red';
            closeButton.innerHTML = '<img src="icons/remove.svg" style="width:100%;height:100%">';
            closeButton.addEventListener('click', function (e) {
                this.options.onDelete();
                polyline.remove()
                arrow.remove()
                this.remove()
            }.bind(this));

            container.appendChild(rotateButton);
            container.appendChild(closeButton);

        },

        remove: function () {
            L.Marker.prototype.remove.call(this);
            polyline.remove();
            arrow.remove();
        },

        _initIcon: function () {

            proto_initIcon.call(this);

            if (runOnce === false) {
                runOnce = true;
                rebuildIcons.call(this);
                //catch click event outside  the container
                document.addEventListener('click', function (e) {
                    console.log('OUT CLICK', container);
                    if (!container.contains(e.target)) {
                        container.style.display = 'none';

                        iconsContainers.forEach(deleteContainer => {
                            //hide buttons containers
                            deleteContainer.style.display = 'none';
                        });
                        activeItem = false;
                    }
                });
            }

            function rebuildIcons() {

                iconsContainers.length = 0

                const zoom = map.getZoom();
                const iconsArray = this.options.iconsArray;
                const allWidth = []

                const imagesForEvents = [] //array to store img information order for actions events

                const div = document.createElement('div');
                div.className = 'markers-icons-div';

                let height;
                iconsArray
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map(iconItem => {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'marker-icon-wrapper';
                        wrapper.style = `
                            display: flex;
                            align-content: center;
                            align-items: center;
                            flex-direction: row;
                        `

                        const deleteContainer = document.createElement('div');
                        deleteContainer.style = 'position:relative;';
                        const buttonsContainer = document.createElement('div');
                        buttonsContainer.style = `
                            position: absolute;
                            gap: 4px;
                            display: flex;
                            flex-direction: row;
                            margin-left: 50px;
                            transform: translateY(-50%);
                        `

                        const deleteButton = document.createElement('div');
                        deleteButton.innerHTML = `<img src="icons/remove.svg" style="width:100%;height:100%">`
                        deleteButton.style = 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);border-radius:5px;padding: 2px; box-sizing: border-box; background-color:red;color:white;width:20px;height:20px;display:flex;justify-content:center;align-items:center;cursor:pointer;';
                        deleteButton.addEventListener('click', (e) => {
                            this.options.iconsArray.splice(this.options.iconsArray.findIndex(item => item.path === iconItem.path), 1);
                            rebuildIcons.call(this);
                        });

                        console.log('this.options.incosAray', this.options.iconsArray, this.options.iconsArray.map(d => {
                            return {
                                sortOrder: d.sortOrder,
                                id: d.id
                            }
                        }));
                        const upButton = document.createElement('div');
                        upButton.innerHTML = `<img src="icons/move-up.svg" style="width:100%;height:100%">`
                        upButton.style = 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);border-radius:5px;padding: 2px; box-sizing: border-box; background-color:blue;color:white;width:20px;height:20px;display:flex;justify-content:center;align-items:center;cursor:pointer;';
                        upButton.addEventListener('click', (e) => {
                            const item = this.options.iconsArray.find(item => item.id === iconItem.id);
                            const currentIndex = this.options.iconsArray.indexOf(item);
                            if (currentIndex < this.options.iconsArray.length - 1) {
                                const nextItem = this.options.iconsArray[currentIndex + 1];
                                // Swap sortOrder
                                [item.sortOrder, nextItem.sortOrder] = [nextItem.sortOrder, item.sortOrder];
                                rebuildIcons.call(this);
                            }
                        });

                        const downButton = document.createElement('div');
                        downButton.innerHTML = `<img src="icons/move-down.svg" style="width:100%;height:100%">`
                        downButton.style = 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);border-radius:5px;padding: 2px; box-sizing: border-box; background-color:blue;color:white;width:20px;height:20px;display:flex;justify-content:center;align-items:center;cursor:pointer;';
                        downButton.addEventListener('click', (e) => {
                            const item = this.options.iconsArray.find(item => item.id === iconItem.id);
                            const currentIndex = this.options.iconsArray.indexOf(item);
                            if (currentIndex > 0) {
                                const previousItem = this.options.iconsArray[currentIndex - 1];
                                // Swap sortOrder
                                [item.sortOrder, previousItem.sortOrder] = [previousItem.sortOrder, item.sortOrder];
                                rebuildIcons.call(this);
                            }
                        });

                        const resizeFactor = zoom * 0.05;
                        const _width = Math.ceil(iconItem.width * resizeFactor);
                        const _height = Math.ceil(iconItem.height * resizeFactor);

                        height = _height;
                        wrapper.style.height = _height + 'px';

                        //resize in %  icon size based on zoom level

                        const img = document.createElement('img');
                        img.src = iconItem.path;
                        img.style = `width: ${_width}px; height: ${_height}px;`;
                        img.className = "custom-marker-icon";

                        wrapper.appendChild(img);

                        imagesForEvents.push({
                            id: iconItem.id,
                            path: iconItem.path,
                            width: iconItem.width,
                            height: iconItem.height,
                            sortOrder: iconItem.sortOrder
                        });

                        if (this.options.iconsArray.length > 1) {
                            buttonsContainer.appendChild(deleteButton);
                            buttonsContainer.appendChild(upButton);
                            buttonsContainer.appendChild(downButton);
                            deleteContainer.appendChild(buttonsContainer);
                            wrapper.appendChild(deleteContainer);
                        }

                        div.prepend(wrapper);

                        if (!activeItem) {
                            deleteContainer.style.display = 'none';
                        }

                        allWidth.push(_width);


                        iconsContainers.push(deleteContainer)
                    });

                const maxWidth = Math.max(...allWidth);

                const border = document.createElement('div');
                border.style = `display:block; width: ${maxWidth}px; height: 4px; border-bottom: 4px solid blue;  `

                const vercticalLine = document.createElement('div');
                vercticalLine.style = 'width: 30px; height: 20px; border-left: 3px solid blue; transform: translate(calc(50% - 2px), 0px);';

                div.appendChild(border);
                div.appendChild(vercticalLine);
                div.appendChild(container);

                div.addEventListener('click', function (event) {
                    // console.log('CLICK', container);
                    if (container.style.display === 'none') {
                        container.style.display = 'flex';

                        iconsContainers.forEach(deleteContainer => {
                            //hide buttons containers
                            deleteContainer.style.display = 'flex';
                        });
                        activeItem = true;
                    }
                    event.stopPropagation();
                });

                const heightWithBorder = height + 2;
                div.style = `transform: translateY(calc(-100% + ${heightWithBorder}px)); display:flex; flex-direction:column;`;

                this.setIcon(L.divIcon({
                    className: 'my-div-icon',
                    html: div,
                    iconSize: [maxWidth, height],
                    iconAnchor: [maxWidth / 2, height]
                }));

                markerProps.actionName = "Icons rebuild";
                markerProps.icons = imagesForEvents;
                this.options.onChange(markerProps);
            }

            function recalculateSortOrder() {
                this.options.iconsArray.forEach((item, index) => {
                    item.sortOrder = index;
                });
            }

            if (!dropHandlerInitialized) { //intit ONCE!
                this._icon.addEventListener('drop', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const transferedData = event.dataTransfer.getData("application/json")
                    const { id, name, path, width, height } = JSON.parse(transferedData)

                    this.options.iconsArray.push({
                        id: id,
                        sortOrder: this.options.iconsArray.length + 1,
                        path: path,
                        width: width,
                        height: height
                    });

                    rebuildIcons.call(this);
                });
                dropHandlerInitialized = true;

                //add zoom end evebt 
                map.on('zoomend', function () {
                    rebuildIcons.call(this);
                }.bind(this));
            }
        },

        _iconCenterLatLng: function (icon) {
            const iconCenter = icon.getBoundingClientRect();
            const iconCenterX = iconCenter.left + iconCenter.width / 2;
            const iconCenterY = iconCenter.top + iconCenter.height / 2;
            const pointXY = L.point(iconCenterX, iconCenterY);
            const pointlatlng = map.layerPointToLatLng(pointXY);
            return pointlatlng;
        },

        _updateArrowAngle: function (event) {

            console.log('_updateArrowAngle!!!',);
            //update arrow angle
            const marker = this;
            const initIconAngle = this.options.rotationAngle;
            const rect = marker._icon.getBoundingClientRect();
            const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            const initialAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
            const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
            const rotationAngle = angle + initIconAngle - initialAngle;
            if (polyline && polyline.getDistance() < 2) {
                arrow.setIcon(L.divIcon({
                    className: 'my-div-icon',
                    html: `<img src="icons/circle.svg" style="transform:rotate(${rotationAngle}deg);width: 14px; height: 14px;">`,
                    iconSize: [14, 14],
                }));
            }
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        _handleRotation: function (event) {

            console.log('rotation', event);

            event.preventDefault();
            event.stopPropagation();

            const marker = this;
            const initIconAngle = this.options.rotationAngle;

            // Calculate initial rotation angle based on the difference between mouse position and marker center
            const rect = marker._icon.getBoundingClientRect();
            const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            const initialAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);

            function handleMouseMove(event) {
                const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
                const rotationAngle = angle + initIconAngle - initialAngle;
                marker.setRotationAngle(rotationAngle);
            }

            const stopRotation = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', stopRotation);

                markerProps.actionName = "Rotation";
                this.options.onChange(markerProps);
            }
            document.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', stopRotation);
        },

        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            markerProps.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });

    return new CustomMarker(latlng, options);
};