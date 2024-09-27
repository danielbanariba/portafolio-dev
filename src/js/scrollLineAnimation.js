// This script should be added to a separate .js file, e.g., scrollLineAnimation.js
document.addEventListener('DOMContentLoaded', () => {
  const line = document.querySelector('.vertical-line');
  const lineLength = line.getTotalLength();
  
  line.style.strokeDasharray = lineLength;
  line.style.strokeDashoffset = lineLength;

  window.addEventListener('scroll', () => {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    const drawLength = lineLength * scrollPercentage;
    line.style.strokeDashoffset = lineLength - drawLength;
  });
});