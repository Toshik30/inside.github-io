const burgerBtn = document.querySelector('.menu-btn'),
      activeNav = document.querySelector('.active-navigation'),
      body = document.querySelector('body');
burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active-menu');
    activeNav.classList.toggle('activated-nav');
    body.classList.toggle('overflow-y')
});



const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
  }
  
  document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement
  
    const createState = e => {
      const defaultState = {
        x: e.clientX,
        y: e.clientY,
        width: 40,
        height: 40,
        radius: '0%',
      }
  
      const computedState = {}
  
      if (onElement != null) {
        const { top, left, width, height } = onElement.getBoundingClientRect()
        const radius = window.getComputedStyle(onElement).borderTopLeftRadius
  
        computedState.x = left + width / 2
        computedState.y = top + height / 2
        computedState.width = width
        computedState.height = height
        computedState.radius = radius
      }
  
      return {
        ...defaultState,
        ...computedState
      }
    }
  
    document.addEventListener('mousemove', e => {
      const state = createState(e)
      updateProperties(cursor, state)
    })
  });

const hoverMenu = document.querySelectorAll('.nav-item');
const cirl = document.querySelectorAll('.cirl');

hoverMenu.forEach((item, i) => item.addEventListener('mouseover', () => {
    cirl[i].style.opacity = '1';
    item.addEventListener('mousemove', e => {
        cirl[i].style.left = e.movementX + e.clientX - 300 + 'px';
    })
} ));  
  
hoverMenu.forEach((item, i) => item.addEventListener('mouseout', () => {
    cirl[i].style.opacity = '0'
} ));




function elementInViewport(el) {
  let bounds = el.getBoundingClientRect();
  return (
    (bounds.top + bounds.height > 0) && 
    (window.innerHeight - bounds.top > 500) && 
    (bounds.left + bounds.width > 0) && 
    (window.innerWidth - bounds.left > 0) 
  );
}


switch (location.pathname) {
  case '/who/':
    const heading = document.querySelector('h1.primary-text'),
          blackSkinBLock = document.querySelector('.black-skin'),
          headingBlackSkin = blackSkinBLock.querySelector('.primary-text');
    const translateToLeft = () => {
        heading.style.cssText = `position:relative; transform: translate(-${document.scrollingElement.scrollTop}px ,0); transition: .2s;`;
    }
    window.addEventListener('scroll', translateToLeft);

    document.addEventListener("scroll", (e) => {
      let inViewport = elementInViewport(headingBlackSkin);
      if(elementInViewport(blackSkinBLock)) {
          inViewport ? headingBlackSkin.classList.add('perspactive-anim') : headingBlackSkin.classList.remove('perspactive-anim');
      }
    });
  break;

  case '/':
    const arrImg = ['./img/bg/photo/swipper1.png', 
                './img/bg/photo/swipper2.png', 
                './img/bg/photo/swipper3.png', 
                './img/bg/photo/swipper4.png',
                './img/bg/photo/swipper1.png', 
                './img/bg/photo/swipper2.png', 
                './img/bg/photo/swipper3.png', 
                './img/bg/photo/swipper4.png',
                './img/bg/photo/swipper1.png', 
                './img/bg/photo/swipper2.png', 
                './img/bg/photo/swipper3.png', 
                './img/bg/photo/swipper4.png'];

    const testImg = document.querySelector('.changed-img'),
          swipperBlock = document.querySelector('.swipper-img-block');

    const changedImages = () => {
        let index = 0;
        let interval = setInterval(function () { 
        testImg.setAttribute('src', arrImg[index++])
            if (index == arrImg.length) {
                clearInterval(interval)
            }
        }, 1300)
    }
    if(body.classList.contains('start-page')) {
      const mainPage = document.querySelector('.main-page'),
          firstState = document.querySelector('.first-state'),
          secondState = document.querySelector('.two-state'),
          threeState = document.querySelector('.three-state');
    
      firstState.addEventListener('mouseover', () => {
          mainPage.classList.add('dark-theme');
      });
      firstState.addEventListener('mouseout', () => {
          mainPage.classList.remove('dark-theme');
      });
      secondState.addEventListener('mouseover', () => {
          mainPage.classList.add('two-statement');
      });
      secondState.addEventListener('mouseout', () => {
          mainPage.classList.remove('two-statement');
      });
      threeState.addEventListener('mouseover', () => {
          mainPage.classList.add('dark-theme-three');
          swipperBlock.style.cssText = `opacity: 1; display: block;`
          changedImages()
      });
      threeState.addEventListener('mouseout', () => {
          mainPage.classList.remove('dark-theme-three');
          swipperBlock.style.cssText = `opacity: 0; display: none;`
          changedImages(false) 
      });
    }
    break;
    case '/projects/':
      const dropedText = document.querySelector('#droped-text');
        dropedText.innerHTML = dropedText.textContent.replace(/\S/g, "<span>$&</span>");

        const animation = anime.timeline({
          targets : '#droped-text span',
          easing : 'easeInOutExpo',
          loop : 1,
        });
        animation
        .add({
          rotate : function() {
            return anime.random(-360, 360)
          },
          translateX : function() {
            return anime.random(-400, 400)
          },
          translateY : function() {
            return anime.random(-200, 200)
          },
          duration : 5000,
          delay: anime.stagger(20),
        })

        .add({
          rotate : 0,
          translateX : 0,
          translateY : 0,
          duration : 5000,
          delay: anime.stagger(20),
        });
        break;
    case '/what/':
      const whoCtn  = document.querySelector('.who-ctn');
      whoCtn.classList.add('anim-bg-right');

      break;
    case '/contact/':
        const  primaryWrapper = document.querySelector('.who-ctn'),
               primaryTxt = primaryWrapper.querySelector('.primary-text');
             
        
        document.addEventListener("scroll", (e) => {
          let inViewport = elementInViewport(primaryTxt);
          if(elementInViewport(primaryWrapper)) {
              inViewport ? primaryTxt.classList.add('anim-bounce') :  primaryTxt.classList.remove('anim-bounce');
          }
        });
       
      break;
}


