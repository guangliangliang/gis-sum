import { Control } from 'ol/control'

class MapSwitcherControl extends Control {
  constructor(options = {}) {
    const button = document.createElement('button')
    button.innerHTML = '🗺️ 切换地图'
    button.title = '切换地图引擎'

    const element = document.createElement('div')
    element.className = 'ol-unselectable ol-control ol-map-switcher'
    element.appendChild(button)

    super({
      element,
      target: options.target,
    })

    this.mapStore = options.mapStore
    this.currentMapType = options.currentMapType || 'openlayer'

    button.addEventListener('click', this.handleSwitch.bind(this), false)
  }

  handleSwitch() {
    const mapTypes = ['openlayer', 'mapbox', 'gaode', 'cesium']
    const currentIndex = mapTypes.indexOf(this.currentMapType)
    const nextIndex = (currentIndex + 1) % mapTypes.length
    const nextType = mapTypes[nextIndex]

    if (this.mapStore) {
      this.mapStore.switchMap(nextType)
    }
  }

  updateCurrentMapType(type) {
    this.currentMapType = type
  }
}

export default MapSwitcherControl
