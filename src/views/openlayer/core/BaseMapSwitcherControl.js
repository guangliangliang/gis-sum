import { Control } from 'ol/control'
import { imageConfigs } from './config'

class BaseMapSwitcherControl extends Control {
  constructor(options = {}) {
    const element = document.createElement('div')
    element.className = 'ol-unselectable ol-control ol-base-map-switcher'

    super({
      element,
      target: options.target
    })

    this.baseMapManager = options.baseMapManager
    this.currentImage = imageConfigs[0].label
    this.showImage = false
    this.nameChecked = true

    this.renderElement()
  }

  renderElement() {
    this.element.innerHTML = ''

    const button = document.createElement('button')
    button.innerHTML = '🌐'
    button.title = '底图切换'
    button.addEventListener('click', (e) => {
      e.stopPropagation()
      this.showImage = !this.showImage
      this.updateMenuVisibility()
    })

    this.element.appendChild(button)

    const menu = document.createElement('div')
    menu.className = 'image-change-config-menu'
    menu.style.cssText = `
      display: ${this.showImage ? 'flex' : 'none'};
      background: white;
      padding: 10px;
      position: absolute;
      right: 100%;
      top: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      border-radius: 4px;
      margin-right: 5px;
    `

    imageConfigs.forEach((item) => {
      const card = document.createElement('div')
      card.className = `single-image ${item.label === this.currentImage ? 'current-image' : ''}`
      card.style.cssText = `
        border: 2px solid ${item.label === this.currentImage ? '#409eff' : '#dcdfe6'};
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 60px;
        justify-content: flex-end;
        width: 60px;
        margin-right: 10px;
        cursor: pointer;
      `

      if (item.label === this.currentImage && item.label !== 'OSM') {
        const checkboxWrapper = document.createElement('div')
        checkboxWrapper.style.cssText = `
          padding: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        `

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = this.nameChecked
        checkbox.style.cssText = `
          cursor: pointer;
        `
        checkbox.addEventListener('change', (e) => {
          e.stopPropagation()
          this.nameChecked = checkbox.checked
          this.baseMapManager.setLabelVisible(this.nameChecked)
        })

        const label = document.createElement('span')
        label.textContent = '地名'
        label.style.cssText = `
          font-size: 12px;
          color: #00d4ff;
        `

        checkboxWrapper.appendChild(checkbox)
        checkboxWrapper.appendChild(label)
        card.appendChild(checkboxWrapper)
      }

      const labelSpan = document.createElement('div')
      labelSpan.className = 'label-span'
      labelSpan.textContent = item.label
      labelSpan.style.cssText = `
        background: ${item.label === this.currentImage ? '#00d4ff' : 'rgba(0, 212, 255, 0.1)'};
        color: ${item.label === this.currentImage ? 'white' : '#00d4ff'};
        text-align: center;
        padding: 2px 0;
        font-size: 12px;
      `
      card.appendChild(labelSpan)

      card.addEventListener('click', (e) => {
        e.stopPropagation()
        if (this.currentImage === item.label) {
          return
        }
        this.currentImage = item.label
        this.baseMapManager.switchBaseLayer(item.value, this.nameChecked ? item.placeName : '')
        this.renderElement()
      })

      menu.appendChild(card)
    })

    this.menuElement = menu
    this.element.appendChild(menu)
  }

  updateMenuVisibility() {
    if (this.menuElement) {
      this.menuElement.style.display = this.showImage ? 'flex' : 'none'
    }
  }
}

export default BaseMapSwitcherControl
