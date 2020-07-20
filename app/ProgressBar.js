const ProgressBar = (
    fullChar = '=',
    emptyChar = '.',
    width = 30
  ) => (percentage, label = '') => {
    let bar = '';
    const emptyChars = percentage * width;
  
    for(let i = 0; i < width; i++) {
      bar += (i < emptyChars) ? fullChar : emptyChar;
    }
  
    return `${bar} ${label}`;
  }
  
export default ProgressBar;
  