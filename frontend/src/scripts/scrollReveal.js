const sr = ScrollReveal({
  reset: false,      
  distance: '60px',   
  duration: 800,     
  delay: 200,        
  easing: 'ease-out', 
});

sr.reveal('body *:not(nav):not(nav *)', {
  origin: 'bottom',   
  interval: 100,      
});