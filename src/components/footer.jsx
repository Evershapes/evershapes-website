import React, { useState, useEffect } from 'react';
import { 
  Twitter, 
  MessageCircle,
  Mail,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deviceType, setDeviceType] = useState('lg');
  
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
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width >= breakpoints.xxl) return 'xxl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(getDeviceType());
    };

    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    updateDeviceType();
    handleScroll();
    
    window.addEventListener('resize', updateDeviceType);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', updateDeviceType);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Responsive values using vh units
  const getResponsiveValue = (type, valueType) => {
    const values = {
      containerPadding: {
        xs: '0 2vh',
        sm: '0 2.5vh',
        md: '0 3vh',
        lg: '0 3.5vh',
        xl: '0 4vh',
        xxl: '0 4.5vh'
      },
      sectionPadding: {
        xs: '3vh 0',
        sm: '4vh 0',
        md: '5vh 0',
        lg: '6vh 0',
        xl: '6.5vh 0',
        xxl: '7vh 0'
      },
      gridGap: {
        xs: '3vh',
        sm: '4vh',
        md: '5vh',
        lg: '6vh',
        xl: '6.5vh',
        xxl: '7vh'
      },
      headingSize: {
        xs: '2.5vh',
        sm: '3vh',
        md: '3.5vh',
        lg: '4vh',
        xl: '4.2vh',
        xxl: '4.5vh'
      },
      subheadingSize: {
        xs: '2vh',
        sm: '2.2vh',
        md: '2.5vh',
        lg: '2.8vh',
        xl: '3vh',
        xxl: '3.2vh'
      },
      bodySize: {
        xs: '1.6vh',
        sm: '1.8vh',
        md: '2vh',
        lg: '2.2vh',
        xl: '2.4vh',
        xxl: '2.6vh'
      },
      smallSize: {
        xs: '1.4vh',
        sm: '1.5vh',
        md: '1.7vh',
        lg: '1.9vh',
        xl: '2vh',
        xxl: '2.2vh'
      },
      ctaHeight: {
        xs: '8vh',
        sm: '9vh',
        md: '10vh',
        lg: '11vh',
        xl: '12vh',
        xxl: '13vh'
      },
      logoHeight: {
        xs: '10vh',
        sm: '12vh',
        md: '14vh',
        lg: '16vh',
        xl: '17vh',
        xxl: '18vh'
      },
      borderRadius: {
        xs: '1vh',
        sm: '1.2vh',
        md: '1.4vh',
        lg: '1.6vh',
        xl: '1.8vh',
        xxl: '2vh'
      },
      logoIconSize: {
        xs: '8vh',
        sm: '9vh',
        md: '10vh',
        lg: '11vh',
        xl: '12vh',
        xxl: '13vh'
      },
      descriptionMaxWidth: {
        xs: '90vw',
        sm: '80vw',
        md: '60vw',
        lg: '50vh',
        xl: '55vh',
        xxl: '60vh'
      }
    };

    return values[valueType]?.[type] || values[valueType]?.['lg'] || '1vh';
  };

  const isMobile = deviceType === 'xs' || deviceType === 'sm';
  const isTablet = deviceType === 'md';

  // Unified styles object with viewport-responsive values
  const styles = {
    footer: {
      background: '#00AFB9',
      position: 'relative',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(5vh)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    },
    
    container: {
      maxWidth: '150vw',
      margin: '0 auto',
      padding: getResponsiveValue(deviceType, 'containerPadding'),
    },
    
    ctaSection: {
      borderBottom: '0.2vh solid #F07167',
      padding: getResponsiveValue(deviceType, 'sectionPadding'),
    },
    
    ctaGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: getResponsiveValue(deviceType, 'gridGap'),
    },
    
    ctaItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: isMobile ? getResponsiveValue(deviceType, 'gridGap') : '0',
      padding: '2vh',
      minHeight: getResponsiveValue(deviceType, 'ctaHeight'),
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: getResponsiveValue(deviceType, 'borderRadius'),
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-5vh)',
      transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
    },
    
    ctaIcon: {
      color: '#F07167',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '6vh',
      height: '6vh',
      marginRight: '2vh',
    },
    
    ctaText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
      minWidth: 0,
    },
    
    ctaHeading: {
      color: '#FDFCDC',
      fontSize: getResponsiveValue(deviceType, 'subheadingSize'),
      fontWeight: '600',
      margin: '0 0 0.5vh 0',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
      lineHeight: '1.2',
    },
    
    ctaSubtext: {
      color: '#FDFCDC',
      fontSize: getResponsiveValue(deviceType, 'bodySize'),
      fontFamily: 'BriceRegular, Arial, sans-serif',
      lineHeight: '1.3',
      margin: 0,
    },
    
    mainContent: {
      position: 'relative',
      zIndex: 2,
      padding: getResponsiveValue(deviceType, 'sectionPadding'),
    },
    
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: getResponsiveValue(deviceType, 'gridGap'),
    },
    
    companySection: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(6vh)',
      transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
    },
    
    logo: {
      marginBottom: '4vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: getResponsiveValue(deviceType, 'logoHeight'),
      padding: '2vh',
      width: '100%',
    },
    
    logoIcon: {
      marginRight: '2vh',
      borderRadius: '2vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: getResponsiveValue(deviceType, 'logoIconSize'),
      height: getResponsiveValue(deviceType, 'logoIconSize'),
    },
    
    logoTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 0,
      marginLeft: '1.5vh',
    },
    
    logoText: {
      background: 'linear-gradient(45deg, #F07167, #FED9B7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: '#F07167',
      fontSize: getResponsiveValue(deviceType, 'headingSize'),
      fontWeight: 'bold',
      fontFamily: 'BriceSemiBoldExpanded, Arial, sans-serif',
      margin: '0 0 1vh 0',
      lineHeight: '1.1',
      textAlign: 'center',
    },
    
    logoSubtext: {
      color: '#FDFCDC',
      fontSize: getResponsiveValue(deviceType, 'smallSize'),
      margin: 0,
      fontFamily: 'BriceRegular, Arial, sans-serif',
      lineHeight: '1.2',
      textAlign: 'center',
      letterSpacing: '0.1vh',
    },
    
    description: {
      fontSize: getResponsiveValue(deviceType, 'bodySize'),
      color: '#FDFCDC',
      lineHeight: '1.6',
      fontFamily: 'BriceRegular, Arial, sans-serif',
      textAlign: 'center',
      maxWidth: getResponsiveValue(deviceType, 'descriptionMaxWidth'),
      marginBottom: '2vh',
    },
    
    linksSection: {
      marginBottom: isMobile ? '5vh' : '0',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(6vh)',
      transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
    },
    
    sectionHeading: {
      color: '#FDFCDC',
      fontSize: getResponsiveValue(deviceType, 'subheadingSize'),
      fontWeight: '600',
      marginBottom: '5vh',
      position: 'relative',
      paddingBottom: '2vh',
      borderBottom: '0.3vh solid #F07167',
      display: 'inline-block',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
    },
    
    linksList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '2vh',
    },
    
    linkItem: {
      marginBottom: '2vh',
    },
    
    link: {
      color: '#FDFCDC',
      textTransform: 'capitalize',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
      fontSize: getResponsiveValue(deviceType, 'bodySize'),
      transition: 'color 0.3s ease',
    },
    
    followSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3vh 0',
      borderTop: '0.1vh solid rgba(255,255,255,0.1)',
      borderBottom: '0.1vh solid rgba(255,255,255,0.1)',
      margin: '3vh 0',
    },
    
    followContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '3vh',
      padding: '2vh',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '2vh',
      minHeight: '8vh',
    },
    
    followText: {
      color: '#FDFCDC',
      fontSize: getResponsiveValue(deviceType, 'subheadingSize'),
      fontWeight: '700',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
      marginRight: '1.5vh',
    },
    
    socialIcon: {
      height: '6vh',
      width: '6vh',
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
      padding: '4vh 0',
    },
    
    copyrightContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2vh',
      textAlign: isMobile ? 'center' : 'left',
    },
    
    copyrightText: {
      margin: 0,
      fontSize: getResponsiveValue(deviceType, 'smallSize'),
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
      gap: '3vh',
    },
    
    menuLink: {
      fontSize: getResponsiveValue(deviceType, 'smallSize'),
      color: '#FDFCDC',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
      transition: 'color 0.3s ease',
    },
  };

  // Placeholder logo component
  const EvershapesLogo = () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #F07167, #FED9B7)',
      borderRadius: '20%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: getResponsiveValue(deviceType, 'headingSize'),
      color: '#FDFCDC',
      fontWeight: 'bold',
    }}>
      E
    </div>
  );

  // Calculate icon sizes based on viewport height
  const getIconSize = (type) => {
    const vhValue = window.innerHeight / 100;
    if (type === 'medium') return Math.round(3 * vhValue);
    if (type === 'small') return Math.round(2.5 * vhValue);
    return Math.round(2 * vhValue);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* CTA Section */}
        <div style={styles.ctaSection}>
          <div style={styles.ctaGrid}>
            <div style={styles.ctaItem}>
              <div style={styles.ctaIcon}>
                <MapPin size={getIconSize('medium')} />
              </div>
              <div style={styles.ctaText}>
                <h4 style={styles.ctaHeading}>Find us</h4>
                <span style={styles.ctaSubtext}>Bordeaux, France 🍷</span>
              </div>
            </div>
            <div style={styles.ctaItem}>
              <div style={styles.ctaIcon}>
                <Mail size={getIconSize('medium')} />
              </div>
              <div style={styles.ctaText}>
                <h4 style={styles.ctaHeading}>Mail us</h4>
                <span style={styles.ctaSubtext}>evershapes@protonmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.contentGrid}>
            <div style={styles.companySection}>
              {/* Company Info */}
              <div style={styles.logo}>
                <div style={styles.logoIcon}>
                  <EvershapesLogo />
                </div>
                <div style={styles.logoTextContainer}>
                  <h3 style={styles.logoText}>Evershapes</h3>
                  <p style={styles.logoSubtext}>Studio</p>
                </div>
              </div>
              <div style={styles.description}>
                <p>Three friends who've been building in Minecraft for years, now creating adventures we actually want to play. We take time with the details because we care about making something that feels right - where everything just fits together naturally.</p>
              </div>
            </div>
            
            <div style={styles.linksSection}>
              {/* Useful Links */}
              <div>
                <h3 style={styles.sectionHeading}>Useful Links</h3>
                <ul style={styles.linksList}>
                  {['Accueil', 'Team', 'Projects', 'Our Twitter', 'Our Discord'].map((link, linkIndex) => (
                    <li key={linkIndex} style={styles.linkItem}>
                      <a 
                        href={
                          link === 'Our Twitter' ? 'https://x.com/EvershapesMC' :
                          link === 'Our Discord' ? 'https://discord.gg/tUgr9493PJ' : '#'
                        }
                        style={styles.link}
                        onMouseEnter={(e) => e.target.style.color = '#F07167'}
                        onMouseLeave={(e) => e.target.style.color = '#FDFCDC'}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Follow Us Section */}
        <div style={styles.followSection}>
          <div style={styles.followContainer}>
            <span style={styles.followText}>Follow us</span>
            <a 
              href="https://x.com/EvershapesMC" 
              style={{
                ...styles.socialIcon,
                background: '#55ACEE'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Twitter size={getIconSize('small')} />
            </a>
            <a 
              href="https://discord.gg/tUgr9493PJ" 
              style={{
                ...styles.socialIcon,
                background: '#7289DA'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <MessageCircle size={getIconSize('small')} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div style={styles.copyrightArea}>
        <div style={styles.container}>
          <div style={styles.copyrightContainer}>
            <div>
              <p style={styles.copyrightText}>
                Copyright © {currentYear}, All Right Reserved{' '}
                <a href="#" style={styles.copyrightLink}>Evershapes Studio</a>
              </p>
            </div>
            <div>
              <ul style={styles.footerMenu}>
                {['Accueil', 'Team', 'Projects', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      style={styles.menuLink}
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
    </footer>
  );
};

export default Footer;