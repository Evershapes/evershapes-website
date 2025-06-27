import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, animated, useTrail, config } from 'react-spring';
import EvershapesLogo from '../assets/logotransparent.svg'
import {
  Twitter,
  MessageCircle,
  Mail,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const currentYear = new Date().getFullYear();

  // Standard CSS media query breakpoints
  const breakpoints = {
    xs: 0,     // Extra small devices
    sm: 576,   // Small devices (landscape phones)
    md: 768,   // Medium devices (tablets)
    lg: 992,   // Large devices (desktops)
    xl: 1200,  // Extra large devices (large desktops)
    xxl: 1400  // Extra extra large devices
  };

  // Device detection based on standard breakpoints
  const getDeviceType = useCallback(() => {
    const width = viewport.width;
    if (width >= breakpoints.xxl) return 'xxl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [viewport.width]);

  const deviceType = getDeviceType();

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    updateViewport();
    handleScroll();

    window.addEventListener('resize', updateViewport);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Debug device type changes
  useEffect(() => {
    console.log(`🦶 Footer - Device Type: ${deviceType.toUpperCase()} (${viewport.width}x${viewport.height})`);
  }, [deviceType, viewport.width, viewport.height]);

  // Animation for the entire footer
  const footerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(3vh)',
    config: config.gentle,
  });

  // Animation for CTA section
  const ctaAnimation = useTrail(2, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0px)' : 'translateX(-3vh)',
    config: config.gentle,
    delay: 200,
  });

  // Animation for footer content sections - now only one section
  const contentAnimation = useTrail(1, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(4vh)',
    config: config.gentle,
    delay: 400,
  });

  // Responsive values based on device type
  const responsive = {
    // Container and grid
    containerPadding: () => {
      switch (deviceType) {
        case 'xs': return '1rem';
        case 'sm': return '1.5rem';
        case 'md': return '2rem';
        case 'lg': return '2.5rem';
        case 'xl': return '3rem';
        case 'xxl': return '3.5rem';
        default: return '2rem';
      }
    },

    gridColumns: () => {
      switch (deviceType) {
        case 'xs': return '1fr';
        case 'sm': return '1fr';
        case 'md': return '1fr'; // Changed to single column since only one section now
        case 'lg': return '1fr';
        case 'xl': return '1fr';
        case 'xxl': return '1fr';
        default: return '1fr';
      }
    },

    // CTA Section
    ctaPadding: () => {
      switch (deviceType) {
        case 'xs': return '2vh';
        case 'sm': return '2.5vh';
        case 'md': return '3vh';
        case 'lg': return '3vh';
        case 'xl': return '3vh';
        case 'xxl': return '3vh';
        default: return '3vh';
      }
    },

    ctaGap: () => {
      switch (deviceType) {
        case 'xs': return '2vh';
        case 'sm': return '2.5vh';
        case 'md': return '3vh';
        case 'lg': return '3vh';
        case 'xl': return '3vh';
        case 'xxl': return '3vh';
        default: return '3vh';
      }
    },

    ctaMinHeight: () => {
      switch (deviceType) {
        case 'xs': return '8vh';
        case 'sm': return '9vh';
        case 'md': return '10vh';
        case 'lg': return '10vh';
        case 'xl': return '10vh';
        case 'xxl': return '11vh';
        default: return '10vh';
      }
    },

    ctaIconSize: () => {
      switch (deviceType) {
        case 'xs': return '3vh';
        case 'sm': return '3.5vh';
        case 'md': return '4vh';
        case 'lg': return '4vh';
        case 'xl': return '4vh';
        case 'xxl': return '4.5vh';
        default: return '4vh';
      }
    },

    ctaIconMargin: () => {
      switch (deviceType) {
        case 'xs': return '1.5vh';
        case 'sm': return '2vh';
        case 'md': return '2vh';
        case 'lg': return '2vh';
        case 'xl': return '2vh';
        case 'xxl': return '2.5vh';
        default: return '2vh';
      }
    },

    // Typography
    ctaTitleSize: () => {
      switch (deviceType) {
        case 'xs': return '2vh';
        case 'sm': return '2.2vh';
        case 'md': return '2.5vh';
        case 'lg': return '2.5vh';
        case 'xl': return '2.5vh';
        case 'xxl': return '2.8vh';
        default: return '2.5vh';
      }
    },

    ctaTextSize: () => {
      switch (deviceType) {
        case 'xs': return '1.6vh';
        case 'sm': return '1.8vh';
        case 'md': return '1.8vh';
        case 'lg': return '1.8vh';
        case 'xl': return '1.8vh';
        case 'xxl': return '2vh';
        default: return '1.8vh';
      }
    },

    // Logo and branding
    logoHeight: () => {
      switch (deviceType) {
        case 'xs': return '10vh';
        case 'sm': return '11vh';
        case 'md': return '12vh';
        case 'lg': return '12vh';
        case 'xl': return '12vh';
        case 'xxl': return '14vh';
        default: return '12vh';
      }
    },

    logoIconSize: () => {
      switch (deviceType) {
        case 'xs': return '6vh';
        case 'sm': return '7vh';
        case 'md': return '8vh';
        case 'lg': return '8vh';
        case 'xl': return '8vh';
        case 'xxl': return '9vh';
        default: return '8vh';
      }
    },

    logoTextSize: () => {
      switch (deviceType) {
        case 'xs': return '3vh';
        case 'sm': return '3.5vh';
        case 'md': return '4vh';
        case 'lg': return '4vh';
        case 'xl': return '4vh';
        case 'xxl': return '4.5vh';
        default: return '4vh';
      }
    },

    logoSubtextSize: () => {
      switch (deviceType) {
        case 'xs': return '1.4vh';
        case 'sm': return '1.6vh';
        case 'md': return '1.8vh';
        case 'lg': return '1.8vh';
        case 'xl': return '1.8vh';
        case 'xxl': return '2vh';
        default: return '1.8vh';
      }
    },

    // Content spacing
    contentPadding: () => {
      switch (deviceType) {
        case 'xs': return '4vh 0';
        case 'sm': return '5vh 0';
        case 'md': return '6vh 0';
        case 'lg': return '6vh 0';
        case 'xl': return '6vh 0';
        case 'xxl': return '7vh 0';
        default: return '6vh 0';
      }
    },

    contentGap: () => {
      switch (deviceType) {
        case 'xs': return '4vh';
        case 'sm': return '5vh';
        case 'md': return '6vh';
        case 'lg': return '6vh';
        case 'xl': return '6vh';
        case 'xxl': return '7vh';
        default: return '6vh';
      }
    },

    // Widget spacing
    widgetMargin: () => {
      switch (deviceType) {
        case 'xs': return '4vh';
        case 'sm': return '5vh';
        case 'md': return '0';
        case 'lg': return '0';
        case 'xl': return '0';
        case 'xxl': return '0';
        default: return '0';
      }
    },

    // Social section
    socialPadding: () => {
      switch (deviceType) {
        case 'xs': return '3vh 0';
        case 'sm': return '3.5vh 0';
        case 'md': return '4vh 0';
        case 'lg': return '4vh 0';
        case 'xl': return '4vh 0';
        case 'xxl': return '4.5vh 0';
        default: return '4vh 0';
      }
    },

    socialGap: () => {
      switch (deviceType) {
        case 'xs': return '2vh';
        case 'sm': return '2.2vh';
        case 'md': return '2.5vh';
        case 'lg': return '2.5vh';
        case 'xl': return '2.5vh';
        case 'xxl': return '2.8vh';
        default: return '2.5vh';
      }
    },

    socialIconSize: () => {
      switch (deviceType) {
        case 'xs': return '4.5vh';
        case 'sm': return '4.8vh';
        case 'md': return '5vh';
        case 'lg': return '5vh';
        case 'xl': return '5vh';
        case 'xxl': return '5.5vh';
        default: return '5vh';
      }
    },

    socialTextSize: () => {
      switch (deviceType) {
        case 'xs': return '2.2vh';
        case 'sm': return '2.4vh';
        case 'md': return '2.5vh';
        case 'lg': return '2.5vh';
        case 'xl': return '2.5vh';
        case 'xxl': return '2.8vh';
        default: return '2.5vh';
      }
    },

    // Copyright
    copyrightPadding: () => {
      switch (deviceType) {
        case 'xs': return '2.5vh 0';
        case 'sm': return '2.8vh 0';
        case 'md': return '3vh 0';
        case 'lg': return '3vh 0';
        case 'xl': return '3vh 0';
        case 'xxl': return '3.5vh 0';
        default: return '3vh 0';
      }
    },

    copyrightGap: () => {
      switch (deviceType) {
        case 'xs': return '2vh';
        case 'sm': return '2vh';
        case 'md': return '2vh';
        case 'lg': return '2vh';
        case 'xl': return '2vh';
        case 'xxl': return '2vh';
        default: return '2vh';
      }
    }
  };

  // Check if mobile layout should be used
  const isMobile = deviceType === 'xs' || deviceType === 'sm' || deviceType === 'md';

  const footerStyles = {
    footerSection: {
      background: '#00AFB9',
      position: 'relative',
      overflow: 'hidden',
    },

    container: {
      maxWidth: '120vh',
      margin: '0 auto',
      padding: `0 ${responsive.containerPadding()}`
    },

    footerCta: {
      borderBottom: '1px solid #F07167',
      paddingTop: responsive.ctaPadding(),
      paddingBottom: responsive.ctaPadding(),
    },

    ctaGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', // Keep CTA as 2 columns
      gap: responsive.ctaGap(),
    },

    singleCta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: isMobile ? responsive.ctaGap() : '0',
      padding: responsive.ctaPadding(),
      minHeight: responsive.ctaMinHeight(),
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '8px',
    },

    ctaIcon: {
      color: '#F07167',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: responsive.ctaIconSize(),
      height: responsive.ctaIconSize(),
      marginRight: responsive.ctaIconMargin(),
    },

    ctaText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      minWidth: 0,
    },

    ctaTextH4: {
      color: '#FDFCDC',
      fontSize: responsive.ctaTitleSize(),
      fontWeight: '600',
      marginBottom: '0.5vh',
      margin: '0 0 0.5vh 0',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
      lineHeight: '1.2',
    },

    ctaTextSpan: {
      color: '#FDFCDC',
      fontSize: responsive.ctaTextSize(),
      fontFamily: 'BriceRegular, Arial, sans-serif',
      lineHeight: '1.3',
      margin: 0,
    },

    footerContent: {
      position: 'relative',
      zIndex: 2,
      padding: responsive.contentPadding(),
    },

    contentGrid: {
      display: 'grid',
      gridTemplateColumns: responsive.gridColumns(),
      gap: responsive.contentGap(),
    },

    footerWidget: {
      marginBottom: responsive.widgetMargin(),
    },

    companySection: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    footerLogo: {
      marginBottom: '4vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: responsive.logoHeight(),
      padding: '2vh',
      width: '100%',
    },

    logoIcon: {
      marginRight: responsive.ctaIconMargin(),
      padding: '1vh',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: responsive.ctaIconSize(),
      height: responsive.ctaIconSize(),
      transform: 'translateY(-1.5vh)',
    },

    logoIconImg: {
      width: responsive.logoIconSize(),
      height: responsive.logoIconSize()
    },

    logoTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 0,
      marginLeft: isMobile ? '0' : '1.5vh',
    },

    logoText: {
      background: 'linear-gradient(45deg, #F07167, #FED9B7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: '#F07167',
      fontSize: responsive.logoTextSize(),
      fontWeight: 'bold',
      fontFamily: 'BriceSemiBoldExpanded',
      margin: '0 0 0.8vh 0',
      lineHeight: '1.1',
      textAlign: 'center',
      overflow: 'hidden'
    },

    logoSubtext: {
      color: '#FDFCDC',
      fontSize: responsive.logoSubtextSize(),
      margin: 0,
      fontFamily: 'BriceRegular, Arial, sans-serif',
      lineHeight: '1.2',
      textAlign: 'center',
      letterSpacing: '0.5px'
    },

    footerText: {
      marginBottom: '2vh',
      fontSize: responsive.ctaTextSize(),
      color: '#FDFCDC',
      lineHeight: '3.5vh',
      fontFamily: 'BriceRegular, Arial, sans-serif',
      textAlign: 'center',
    },

    followSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: responsive.socialPadding(),
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      margin: `${responsive.ctaPadding()} 0`
    },

    followContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: responsive.socialGap(),
      padding: '2vh',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      minHeight: '7vh'
    },

    followText: {
      color: '#FDFCDC',
      fontSize: responsive.socialTextSize(),
      fontWeight: '700',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
      marginRight: '1.5vh'
    },

    followIcon: {
      height: responsive.socialIconSize(),
      width: responsive.socialIconSize(),
      textAlign: 'center',
      borderRadius: '50%',
      color: '#FDFCDC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'transform 0.3s ease',
    },

    copyrightArea: {
      background: '#0081A7',
      padding: responsive.copyrightPadding(),
    },

    copyrightContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: responsive.copyrightGap(),
      textAlign: isMobile ? 'center' : 'left',
    },

    copyrightText: {
      margin: 0,
      fontSize: responsive.ctaTextSize(),
      color: '#FDFCDC',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },

    copyrightLink: {
      color: '#F07167',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },

    footerMenu: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-end',
      flexWrap: 'wrap',
      gap: '2.5vh',
    },

    footerMenuLink: {
      fontSize: responsive.ctaTextSize(),
      color: '#FDFCDC',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },
  };

  return (
    <animated.footer style={{ ...footerStyles.footerSection, ...footerAnimation }}>
      <div style={footerStyles.container}>
        {/* CTA Section */}
        <div style={footerStyles.footerCta}>
          <div style={footerStyles.ctaGrid}>
            {ctaAnimation.map((style, index) => (
              <animated.div key={index} style={{ ...style, ...footerStyles.singleCta }}>
                {index === 0 ? (
                  <>
                    <div style={footerStyles.ctaIcon}>
                      <MapPin size={24} />
                    </div>
                    <div style={footerStyles.ctaText}>
                      <h4 style={footerStyles.ctaTextH4}>Find us</h4>
                      <span style={footerStyles.ctaTextSpan}>Bordeaux, France 🍷</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={footerStyles.ctaIcon}>
                      <Mail size={24} />
                    </div>
                    <div style={footerStyles.ctaText}>
                      <h4 style={footerStyles.ctaTextH4}>Mail us</h4>
                      <span style={footerStyles.ctaTextSpan}>evershapes@protonmail.com</span>
                    </div>
                  </>
                )}
              </animated.div>
            ))}
          </div>
        </div>

        {/* Footer Content - Now only company info */}
        <div style={footerStyles.footerContent}>
          <div style={footerStyles.contentGrid}>
            {contentAnimation.map((style, index) => (
              <animated.div key={index} style={{ ...style, ...footerStyles.footerWidget }}>
                <div style={footerStyles.companySection}>
                  {/* Company Info */}
                  <img
                    src={EvershapesLogo}
                    alt="Evershapes Logo"
                    style={footerStyles.logoIconImg}
                  />
                  <div style={footerStyles.footerLogo}>
                    <div style={footerStyles.logoTextContainer}>
                      <h3 style={footerStyles.logoText}>Evershapes</h3>
                      <p style={footerStyles.logoSubtext}>Studio</p>
                    </div>
                  </div>
                  <div style={footerStyles.footerText}>
                    <p>Three friends who've been building in Minecraft for years, now creating adventures we actually want to play. We take time with the details because we care about making something that feels right - where everything just fits together naturally.</p>
                  </div>
                </div>
              </animated.div>
            ))}
          </div>
        </div>

        {/* Follow Us Section */}
        <div style={footerStyles.followSection}>
          <div style={footerStyles.followContainer}>
            <span style={footerStyles.followText}>Follow us</span>
            <a href="https://x.com/EvershapesMC" style={{
              ...footerStyles.followIcon,
              background: '#55ACEE'
            }}>
              <Twitter size={16} />
            </a>
            <a href="https://discord.gg/tUgr9493PJ" style={{
              ...footerStyles.followIcon,
              background: '#7289DA'
            }}>
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div style={footerStyles.copyrightArea}>
        <div style={footerStyles.container}>
          <div style={footerStyles.copyrightContainer}>
            <div>
              <p style={footerStyles.copyrightText}>
                Copyright © {currentYear}, All Right Reserved{' '}
                <a href="#" style={footerStyles.copyrightLink}>Evershapes Studio</a>
              </p>
            </div>
            <div>
              <ul style={footerStyles.footerMenu}>
                {['Accueil', 'Team', 'Projects', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      style={footerStyles.footerMenuLink}
                      onMouseEnter={(e) => e.target.style.color = '#F07167'}
                      onMouseLeave={(e) => e.target.style.color = '#FDFCDC'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;