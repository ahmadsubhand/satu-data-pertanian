import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Typography, Button } from 'antd';
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;

interface MultimediaPageProps extends PageProps {
  pageTitle?: string;
  description?: string;
  category?: string;
}

const MultimediaPage: React.FC<MultimediaPageProps> = ({
  pageTitle = "Multimedia",
  description = "Konten multimedia terkait pertanian dalam berbagai format",
  category = "Multimedia"
}) => {
  return (
    <PublicLayout title={`${pageTitle} - Satudata Pertanian`}>
      <Head title={`${pageTitle} - Satudata Pertanian`} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2d5036 0%, #4a7c59 100%)',
          borderRadius: '16px',
          padding: '50px 30px',
          marginBottom: '40px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(45, 80, 54, 0.4)',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Title
              level={1}
              style={{
                color: 'white',
                marginBottom: '16px',
                fontSize: '36px',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              {pageTitle}
            </Title>
            <Paragraph
              style={{
                fontSize: '18px',
                color: '#e8f5e9',
                maxWidth: '800px',
                margin: '0 auto 16px',
                lineHeight: '1.7',
              }}
            >
              {description}
            </Paragraph>
          </div>
        </div>

        {/* Instagram Showcase Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          padding: '40px 20px',
          marginBottom: '40px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
          }}>
            <Title
              level={2}
              style={{
                color: '#2d5036',
                marginBottom: '10px',
                fontSize: '28px',
              }}
            >
              Instagram Pusdatin
            </Title>
            <Paragraph
              style={{
                fontSize: '16px',
                color: '#495057',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Temukan informasi terkini seputar data dan statistik pertanian melalui akun Instagram resmi Pusat Data dan Sistem Informasi Pertanian
            </Paragraph>
          </div>

          {/* Modern flagship phone mockup with Instagram image */}
          <div style={{
            position: 'relative',
            width: '300px',
            height: '620px', // Slightly taller for modern aspect ratio
            background: '#0f0f0f',
            borderRadius: '50px', // More extreme rounding for modern look
            padding: '25px 8px 85px',
            boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.05), 0 30px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '16px solid #0f0f0f',
            overflow: 'hidden',
          }}>
            {/* Modern phone volume buttons */}
            <div style={{
              position: 'absolute',
              left: '-26px',
              top: '100px',
              width: '5px',
              height: '45px',
              background: '#2a2a2a',
              borderRadius: '8px',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
            }}></div>
            <div style={{
              position: 'absolute',
              right: '-26px',
              top: '80px',
              width: '5px',
              height: '100px',
              background: '#2a2a2a',
              borderRadius: '8px',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
            }}></div>

            {/* Screen content with ultra-thin bezels */}
            <div style={{
              width: '100%',
              height: '100%',
              background: '#000',
              borderRadius: '42px', // Matching the outer curve
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Punch hole camera area */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '25px',
                width: '32px',
                height: '32px',
                background: '#111',
                borderRadius: '50%',
                zIndex: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #222',
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: '#222',
                  borderRadius: '50%',
                }}></div>
              </div>

              {/* Instagram image content */}
              <div style={{
                flex: 1,
                marginTop: '50px', // Account for the punch hole camera
                padding: '8px', // Add slight padding for visual aesthetics
              }}>
                <img
                  src="/images/logos/Instagram_Pusdatin.jpg"
                  alt="Instagram Pusdatin"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain', // Changed to 'contain' to show the full image without cropping
                    borderRadius: '24px', // Rounded corners matching modern UI
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.backgroundColor = '#e1306c';
                    target.style.color = 'white';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.fontSize = '14px';
                    target.style.padding = '20px';
                    target.style.textAlign = 'center';
                    target.innerHTML = 'Instagram Pusdatin Logo';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Follow button */}
          <a
            href="https://www.instagram.com/pusdatin_kementan?igsh=bmM0cjVicG1vOHk3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="large"
              style={{
                background: 'linear-gradient(45deg, #e1306c, #f77737)',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                padding: '15px 40px',
                borderRadius: '30px',
                border: 'none',
                boxShadow: '0 6px 20px rgba(225, 48, 108, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-3px)';
                target.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.5)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 6px 20px rgba(225, 48, 108, 0.4)';
              }}
            >
              Follow Instagram
            </Button>
          </a>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MultimediaPage;