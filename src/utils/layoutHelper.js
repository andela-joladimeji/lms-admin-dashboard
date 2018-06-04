import logo from '../images/andela.svg';

const LayoutHelper = function() {
  const logoSvg = function() {
    const image = document.createElement('img');
    image.src = logo;
    image.alt = 'andela logo';
    return image;
  };

  return {
    logoImage: function() {
      return logoSvg();
    },

    tooglePageLoader: function(isLoading) {
      const loader = document.getElementById('progress-indicator');
      if (loader) {
        const spinner = loader.getElementsByClassName('logo-frame')[0];
        if (isLoading) {
          const logo = logoSvg();
          logo.className = "logo-frame-img logo";
          spinner.replaceChild(logo, spinner.firstChild);
          loader.classList.remove('available');
        } else {
          loader.classList.add('available');
          spinner.firstElementChild.classList.remove('logo');
        }
      }
    }
  };
};

export default LayoutHelper();