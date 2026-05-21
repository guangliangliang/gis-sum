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
    const button = document.createElement('button')
    button.innerHTML = '🌐'
    button.title = '底图切换'
    button.style.cssText = `
      width: 30px;
      height: 30px;
      font-size: 18px;
      border: none;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `
    button.addEventListener('click', () => {
      this.showImage = !this.showImage
      this.updateMenuVisibility()
    })

    this.element.appendChild(button)

    const menu = document.createElement('div')
    menu.className = 'image-change-config-menu'
    menu.style.cssText = `
      display: none;
      background: white;
      padding: 10px;
      position: absolute;
      right: 30px;
      top: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      border-radius: 4px;
    `

    imageConfigs.forEach((item) => {
      const card = document.createElement('div')
      card.className = `single-image ${item.label === this.currentImage ? 'current-image' : ''}`
      card.style.cssText = `
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 60px;
        justify-content: flex-end;
        width: 60px;
        margin-right: 10px;
        cursor: pointer;
      `

      if (item.label === this.currentImage) {
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
        checkbox.addEventListener('change', () => {
          this.nameChecked = checkbox.checked
          this.baseMapManager.setLabelVisible(this.nameChecked)
        })

        const label = document.createElement('span')
        label.textContent = '地名'
        label.style.cssText = `
          font-size: 12px;
        `

        checkboxWrapper.appendChild(checkbox)
        checkboxWrapper.appendChild(label)
        card.appendChild(checkboxWrapper)
      }

      const labelSpan = document.createElement('div')
      labelSpan.className = 'label-span'
      labelSpan.textContent = item.label
      labelSpan.style.cssText = `
        background: ${item.label === this.currentImage ? '#409eff' : 'white'};
        color: ${item.label === this.currentImage ? 'white' : '#606266'};
        text-align: center;
        padding: 2px 0;
        font-size: 12px;
      `
      card.appendChild(labelSpan)

      if (item.label !== this.currentImage) {
        card.style.borderColor = '#dcdfe6'
      } else {
        card.style.borderColor = '#409eff'
      }

      card.addEventListener('click', () => {
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
