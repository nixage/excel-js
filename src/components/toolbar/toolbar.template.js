export function createToolbar(state = {}) {
  console.log(state)
  const buttonConfig = [
    {
      type: 'format_bold',
      style: 'fontWeight',
      value: state['fontWeight'] === 'bold' ? 'normal': 'bold',
      active: state['fontWeight'] === 'bold'
    },
    {
      type: 'format_italic',
      style: 'fontStyle',
      value: state['fontStyle'] === 'italic' ? 'normal': 'italic',
      active: state['fontStyle'] === 'italic'
    },
    {
      type: 'format_underlined',
      style: 'textDecoration',
      value: state['textDecoration'] === 'underline' ? 'none' : 'underline',
      active: state['textDecoration'] === 'underline'
    },
    {
      type: 'format_align_left',
      style: 'justifyContent',
      value: 'flex-start',
      active: state['justifyContent'] === 'flex-start'
    },
    {
      type: 'format_align_center',
      style: 'justifyContent',
      value: 'center',
      active: state['justifyContent'] === 'center'
    },
    {
      type: 'format_align_right',
      style: 'justifyContent',
      value: 'flex-end',
      active: state['justifyContent'] === 'flex-end'
    },
  ];
  let template = []

  buttonConfig.forEach(el => template.push(renderButton(el)));
  template = template.join('')
  return `
    <div class="excel-toolbar__row">
      ${template}
    </div>
  `;
}

function renderButton(button) {
  const active = button.active === true ? 'active' : '';
  return `
  <div class="excel-toolbar__button">
    <button class="btn btn-g ${active}" data-type="button" data-value="${button.value}" data-style="${button.style}">
      <span class="material-icons">${button.type}</span>
    </button>
  </div>
  `
}
