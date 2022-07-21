function board_creator(board_size_px,
  n_rows,
  n_cols,
  show_schema_pas,
  show_new_pas,
  curr_trial) {


  // debugger

  // Create the grid 
  grid_border = document.createElement('div')
  grid_border.id = 'grid_border'

  // grid_border.style['background-image'] = "url(" + border_image_path + ")"
  // grid_border.style['background-size'] = 'contain'
  grid_border.style.height = (board_size_px + 60) + 'px'
  grid_border.style.width = (board_size_px + 60) + 'px'

  // Create the grid box element
  let grid_box = document.createElement('div')
  grid_box.id = 'grid_box'
  grid_box.style =
    'height:' + board_size_px + 'px;' +
    'width:' + board_size_px + 'px;' +
    'grid-template-columns: repeat(' + n_cols + ', 1fr);' +
    'grid-template-rows: repeat(' + n_rows + ', 1fr);' +
    // 'border: 10px solid ' + curr_trial.color + ';' + 
    'background-color: ' + curr_trial.color + ';' +
    // 'opacity: 0.4;' +
    'position: absolute;' +
    'top: 50%;' +
    'left: 50%;' +
    'transform: translate(-50%, -50%);'

  // Create the cells
  for (ir = 0; ir < n_rows; ir++) {

    for (ic = 0; ic < n_cols; ic++) {

      iCell = document.createElement('div')

      iCell.className = 'cells'
      iCell.id = 'cell_r_' + (ir + 1) + '_c_' + (ic + 1)

      // iCell.style = 
      //   'background-color: '+ curr_trial.color +';'
      // 'opacity: 0.4;'
      // 'border-right: 3px solid ' + curr_trial.color + ';' +
      // 'border-bottom: 3px solid ' + curr_trial.color + ';'

      grid_box.appendChild(iCell)

    }
  }

  if (show_schema_pas) {
    var schema_pa_visibility_status = 'visible'
    // var schema_pa_opacity = 1
  } else {
    var schema_pa_visibility_status = 'hidden'
    // var schema_pa_opacity = 0.4
  }
  if (show_new_pas) {
    var new_pa_visibility_status = 'visible'
    // var schema_pa_opacity = 1
  } else {
    var new_pa_visibility_status = 'hidden'
    // var new_pa_opacity = 0.4
  }


  // Add the schema-PAs
  // debugger
  for (iImg = 0; iImg < curr_trial.schema_pa_all_imgs.length; iImg++) {

    // Which row and col?
    let i_row = curr_trial.schema_pa_all_img_coords[iImg].row
    let i_col = curr_trial.schema_pa_all_img_coords[iImg].column

    iEl = document.createElement('img')

    iEl.className = 'PA'
    iEl.id = 'schema_pa_' + (iImg + 1)
    iEl.src = curr_trial.schema_pa_all_imgs[iImg]
    iEl.style =
      'visibility: ' + schema_pa_visibility_status + ';'

    let nth_child_idx = (i_row - 1) * n_cols + i_col

    let iCell = grid_box.children[nth_child_idx - 1]
    // iCell.style.opacity = schema_pa_opacity

    iCell.appendChild(iEl)

  }

  // debugger
  // Add the new PAs
  if (curr_trial.condition != 'practice') {

    for (iImg = 0; iImg < curr_trial.new_pa_all_imgs.length; iImg++) {

      // Which row and col?
      let i_row = curr_trial.new_pa_all_img_coords[iImg].row
      let i_col = curr_trial.new_pa_all_img_coords[iImg].column

      iEl = document.createElement('img')

      iEl.className = 'PA'
      iEl.id = 'new_pa_' + (iImg + 1)
      iEl.src = curr_trial.new_pa_all_imgs[iImg]
      iEl.style =
        'visibility: ' + new_pa_visibility_status + ';'

      let nth_child_idx = (i_row - 1) * n_cols + i_col

      let iCell = grid_box.children[nth_child_idx - 1]
      // iCell.style.opacity = new_pa_opacity
      iCell.appendChild(iEl)

    }

  }
  grid_border.appendChild(grid_box)

  return grid_border
}