import * as THREE from 'three'

export default (e, width, height, camera, object, attrs, sId) => {
  let mouse = {}
  mouse.x = 2 * (e.clientX / width) - 1
  mouse.y = 1 - 2 * ((e.clientY - 70) / height)
  let raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)
  let intersects = raycaster.intersectObjects(object.children, true)
  if (intersects[0]) {
    if (sId) {
      let o = intersects[0].object
      let dataItem = attrs[sId][o.name]
      if (dataItem) {
        document.body.style.cursor = 'pointer'
      } else {
        dataItem = attrs[sId].subAttr[o.name]
        if (dataItem) {
          document.body.style.cursor = 'pointer'
        } else {
          document.body.style.cursor = 'default'
        }
      }
    } else {
      let o = intersects[0].object
      let dataItem = attrs[o.name]
      if (dataItem) {
        if (dataItem.assetType !== 'color') {
          document.body.style.cursor = 'pointer'
        }
      }
      else {
        document.body.style.cursor = 'default'
      }
    }
  } else {
    document.body.style.cursor = 'default'
  }

}
