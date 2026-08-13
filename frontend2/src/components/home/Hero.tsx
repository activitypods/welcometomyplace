import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'antd';
import { Link } from 'react-router';

const ctaButtonStyle: CSSProperties = {
  padding: '28px 40px',
  borderRadius: 999,
  color: '#FFA500',
  fontSize: 20,
  fontFamily: 'Chewy, serif',
  height: 'auto'
};

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: 'url("/images/background.png")',
        backgroundPosition: 'center bottom',
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 'clamp(100px, 15vh, 150px)',
          width: '100%',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography.Title
          style={{
            textAlign: 'center',
            fontSize: 'clamp(30px, 5vw, 50px)',
            fontWeight: 'bold',
            maxWidth: 650,
            lineHeight: 1.1,
            marginBottom: 16,
            fontFamily: 'inherit',
            color: '#fff'
          }}
        >
          {t('home.title')}
        </Typography.Title>
        <Typography.Text
          style={{ textAlign: 'center', fontSize: 'clamp(20px, 3vw, 30px)', maxWidth: 650, lineHeight: 1.1, color: '#fff' }}
        >
          {t('home.subtitle')}
        </Typography.Text>
      </div>
      <div style={{ position: 'absolute', bottom: 64, width: '100%', textAlign: 'center' }}>
        <Link to="/login?signup=true">
          <Button type="default" style={{ ...ctaButtonStyle, marginRight: 16 }}>
            {t('actions.signup')}
          </Button>
        </Link>
        <Link to="/login">
          <Button type="default" style={ctaButtonStyle}>
            {t('actions.login')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
