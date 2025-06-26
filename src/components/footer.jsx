import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    handleResize();
    handleScroll();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation for the entire footer
  const footerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
    config: config.gentle,
  });

  // Animation for CTA section
  const ctaAnimation = useTrail(2, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0px)' : 'translateX(-30px)',
    config: config.gentle,
    delay: 200,
  });

  // Animation for footer content sections
  const contentAnimation = useTrail(2, {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    config: config.gentle,
    delay: 400,
  });

  const footerStyles = {
    footerSection: {
      background: '#00AFB9',
      position: 'relative',
    },
    footerCta: {
      borderBottom: '1px solid #F07167',
      paddingTop: '2rem',
      paddingBottom: '2rem',
    },
    singleCta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: isMobile ? '2rem' : '0',
      padding: '1rem',
      minHeight: '80px', // Critical: height reference for centering
      backgroundColor: 'rgba(255,255,255,0.05)', // Subtle background for better definition
      borderRadius: '8px',
    },
    ctaIcon: {
      color: '#F07167',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      marginRight: '15px',
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
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '4px',
      margin: '0 0 4px 0',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
      lineHeight: '1.2',
    },
    ctaTextSpan: {
      color: '#FDFCDC',
      fontSize: '15px',
      fontFamily: 'BriceRegular, Arial, sans-serif',
      lineHeight: '1.3',
      margin: 0,
    },
    footerContent: {
      position: 'relative',
      zIndex: 2,
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
    footerLogo: {
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100px', // Increased height for bigger logo
      padding: '1rem',
      width: '100%',
    },
    logoIcon: {
      marginRight: '15px',
      padding: '8px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: '80px',
      height: '80px',
      transform: 'translateY(-12px)', // Offset logo up to align bottom with "Evershapes" text
    },
    logoTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', // Center the text properly
      minWidth: 0,
      marginLeft: '10px', // Give some breathing room from logo
    },
    logoText: {
      background: 'linear-gradient(45deg, #F07167, #FED9B7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: '#F07167',
      fontSize: '4vh', // Made bigger
      fontWeight: 'bold',
      fontFamily: 'BriceSemiBoldExpanded',
      margin: '0 0 6px 0', // More spacing
      lineHeight: '1.1',
      textAlign: 'center',
      overflow:'hidden'
    },
    footerText: {
      marginBottom: '14px',
      fontSize: '14px',
      color: '#FDFCDC',
      lineHeight: '28px',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },
    footerWidgetHeading: {
      color: '#FDFCDC',
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '40px',
      position: 'relative',
      paddingBottom: '15px',
      borderBottom: '2px solid #F07167',
      display: 'inline-block',
      fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
    },
    footerWidget: {
      marginBottom: isMobile ? '3rem' : '0',
    },
    footerWidgetUl: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '12px',
    },
    footerWidgetLi: {
      marginBottom: '12px',
    },
    footerWidgetLink: {
      color: '#FDFCDC',
      textTransform: 'capitalize',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },
    footerMenuLink: {
      fontSize: '14px',
      color: '#FDFCDC',
      textDecoration: 'none',
      fontFamily: 'BriceRegular, Arial, sans-serif',
    },
    copyrightArea: {
      background: '#0081A7',
      padding: '25px 0',
    },
    copyrightText: {
      margin: 0,
      fontSize: '14px',
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
      gap: '20px',
    },
  };

  return (
    <animated.footer style={{...footerStyles.footerSection, ...footerAnimation}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        {/* CTA Section */}
        <div style={footerStyles.footerCta}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
          }}>
            {ctaAnimation.map((style, index) => (
              <animated.div key={index} style={{...style, ...footerStyles.singleCta}}>
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

        {/* Footer Content */}
        <div style={footerStyles.footerContent}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '3rem',
          }}>
            {contentAnimation.map((style, index) => (
              <animated.div key={index} style={{...style, ...footerStyles.footerWidget}}>
                {index === 0 && (
                  <div style={{
                    textAlign: 'center', // Center all content in this section
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center' // Center everything horizontally
                  }}>
                    {/* Company Info */}
                    <div style={footerStyles.footerLogo}>
                      <div style={footerStyles.logoIcon}>
                        <img 
                          src={EvershapesLogo}
                          alt="Evershapes Logo" 
                          style={{width: '64px', height: '64px'}}
                        />
                      </div>
                      <div style={footerStyles.logoTextContainer}>
                        <h3 style={footerStyles.logoText}>Evershapes</h3>
                        <p style={{
                          color: '#FDFCDC', 
                          fontSize: '14px', // Made bigger
                          margin: 0, 
                          fontFamily: 'BriceRegular, Arial, sans-serif',
                          lineHeight: '1.2',
                          textAlign: 'center',
                          letterSpacing: '0.5px' // Added letter spacing for less cramped look
                        }}>Studio</p>
                      </div>
                    </div>
                    <div style={{...footerStyles.footerText, textAlign: 'center', maxWidth: '300px'}}>
                      <p>Three friends who've been building in Minecraft for years, now creating adventures we actually want to play. We take time with the details because we care about making something that feels right - where everything just fits together naturally.</p>
                    </div>
                  </div>
                )}
                
                {index === 1 && (
                  <>
                    {/* Useful Links */}
                    <div>
                      <h3 style={footerStyles.footerWidgetHeading}>Useful Links</h3>
                      <ul style={footerStyles.footerWidgetUl}>
                        {['Accueil', 'Team', 'Projects', 'Our Twitter', 'Our Discord'].map((link, linkIndex) => (
                          <li key={linkIndex} style={footerStyles.footerWidgetLi}>
                            <a 
                              href={
                                link === 'Our Twitter' ? 'https://x.com/EvershapesMC' :
                                link === 'Our Discord' ? 'https://discord.gg/tUgr9493PJ' : '#'
                              }
                              style={footerStyles.footerWidgetLink}
                              onMouseEnter={(e) => e.target.style.color = '#F07167'}
                              onMouseLeave={(e) => e.target.style.color = '#FDFCDC'}
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </animated.div>
            ))}
          </div>
        </div>

        {/* Follow Us Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          margin: '2rem 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '1rem',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            minHeight: '60px'
          }}>
            <span style={{
              color: '#FDFCDC',
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'BriceSemiBoldSemiExpanded, Arial, sans-serif',
              marginRight: '10px'
            }}>Follow us</span>
            <a href="https://x.com/EvershapesMC" style={{
              height: '40px',
              width: '40px',
              textAlign: 'center',
              lineHeight: '38px',
              borderRadius: '50%',
              color: '#FDFCDC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              background: '#55ACEE'
            }}>
              <Twitter size={16} />
            </a>
            <a href="https://discord.gg/tUgr9493PJ" style={{
              height: '40px',
              width: '40px',
              textAlign: 'center',
              lineHeight: '38px',
              borderRadius: '50%',
              color: '#FDFCDC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              background: '#7289DA'
            }}>
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div style={footerStyles.copyrightArea}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            textAlign: isMobile ? 'center' : 'left',
          }}>
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