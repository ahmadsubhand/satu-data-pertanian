import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <>
            <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col overflow-hidden bg-gradient-to-br from-green-800 to-green-900 p-10 text-white lg:flex">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-800/90 to-green-900/90" />

                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Floating particles */}
                        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-green-300/30"></div>
                        <div className="animation-delay-1000 absolute top-1/3 right-1/3 h-1 w-1 animate-ping rounded-full bg-green-200/40"></div>
                        <div className="animation-delay-2000 absolute bottom-1/4 left-1/3 h-3 w-3 animate-pulse rounded-full bg-green-400/20"></div>
                        <div className="animation-delay-1500 absolute top-2/5 right-1/4 h-2 w-2 animate-bounce rounded-full bg-green-300/30"></div>

                        {/* Animated agricultural elements */}
                        <div className="animate-float absolute top-1/5 left-1/5 text-3xl text-green-200/30">
                            🌾
                        </div>
                        <div className="animate-float animation-delay-2000 absolute right-1/5 bottom-1/5 text-4xl text-green-200/30">
                            🚜
                        </div>
                        <div className="animate-float animation-delay-3000 absolute top-2/5 right-1/4 text-2xl text-green-200/30">
                            🌱
                        </div>
                        <div className="animate-float animation-delay-1500 absolute bottom-1/4 left-1/4 text-3xl text-green-200/30">
                            🍃
                        </div>
                    </div>

                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[url('/images/logos/logo-satudata-indonesia-3.png')] bg-cover bg-center opacity-5"></div>
                    </div>

                    <Link
                        href={home()}
                        className="animate-pulse-grow group relative z-20 flex items-center rounded-xl border border-green-300/40 bg-gradient-to-r from-green-500/30 to-lime-400/30 px-5 py-4 font-medium shadow-lg"
                    >
                        <div
                            className="mr-4 flex flex-shrink-0 items-center justify-center rounded-xl bg-white p-3.5 shadow-md transition-shadow duration-300 group-hover:shadow-lg"
                            style={{ height: '64px', width: '200px' }}
                        >
                            <img
                                src="/images/logos/logo-satudata.png"
                                alt="Logo Portal Satu Data Pertanian"
                                className="transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    height: '48px',
                                    width: 'auto',
                                    maxWidth: '240px',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden" style={{ flex: 1 }}>
                            <span
                                className="text-left transition-colors duration-300 group-hover:text-green-100"
                                style={{
                                    color: '#f0f9f2',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    lineHeight: '1.3',
                                }}
                            >
                                Portal Satu Data Pertanian
                            </span>
                            <span
                                className="mt-1 text-left text-xs opacity-90 transition-colors duration-300 group-hover:text-green-200"
                                style={{
                                    color: '#d8f0dd',
                                    fontWeight: '500',
                                    textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                                    lineHeight: '1.2',
                                }}
                            >
                                Kementerian Pertanian - Republik Indonesia
                            </span>
                        </div>
                    </Link>

                    <div className="animate-slide-in-left animation-delay-300 relative z-20 flex flex-1 flex-col justify-center space-y-6">
                        <div className="space-y-4">
                            <h2 className="animate-slide-in-left animation-delay-500 text-3xl font-bold tracking-tight">
                                Login Administrator
                            </h2>
                            <p className="animate-slide-in-left animation-delay-700 max-w-md text-lg text-green-100/90">
                                Akses panel administrasi untuk mengelola data statistik,
                                publikasi, dan konten lainnya di Portal Satu Data Pertanian.
                            </p>
                        </div>

                        <div className="animate-slide-in-left animation-delay-1000 space-y-4 pt-6">
                            <div className="animate-fade-in-up animation-delay-1200 flex items-start space-x-3">
                                <div className="text-green-300 text-xl">✓</div>
                                <div>
                                    <div className="font-semibold text-white">Kelola Data</div>
                                    <div className="text-sm text-green-200">Atur dataset dan publikasi</div>
                                </div>
                            </div>

                            <div className="animate-fade-in-up animation-delay-1400 flex items-start space-x-3">
                                <div className="text-green-300 text-xl">✓</div>
                                <div>
                                    <div className="font-semibold text-white">Analisis Statistik</div>
                                    <div className="text-sm text-green-200">Monitor data pertanian terkini</div>
                                </div>
                            </div>

                            <div className="animate-fade-in-up animation-delay-1600 flex items-start space-x-3">
                                <div className="text-green-300 text-xl">✓</div>
                                <div>
                                    <div className="font-semibold text-white">Keamanan Terjamin</div>
                                    <div className="text-sm text-green-200">Akses terbatas untuk administrator</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-slide-in-left animation-delay-2000 relative z-20 text-sm text-green-200/80">
                        &copy; {new Date().getFullYear()} Satudata Pertanian.
                        Semua hak dilindungi.
                    </div>
                </div>
                <div className="w-full lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <Link
                            href={home()}
                            className="relative z-20 flex items-center justify-center lg:hidden"
                        >
                            <img
                                src="/images/logos/logo-satudata.png"
                                alt="Logo Satudata Pertanian"
                                className="h-10 sm:h-12"
                            />
                        </Link>
                        <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                            <h1 className="text-2xl font-semibold">{title}</h1>
                            <p className="text-sm text-balance text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <style>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
          
          .animation-delay-700 {
            animation-delay: 0.7s;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-1200 {
            animation-delay: 1.2s;
          }
          
          .animation-delay-1400 {
            animation-delay: 1.4s;
          }
          
          .animation-delay-1600 {
            animation-delay: 1.6s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          @keyframes pulseGrow {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.03);
              opacity: 0.95;
            }
          }
          
          .animate-pulse-grow {
            animation: pulseGrow 3s ease-in-out infinite;
          }
        `}</style>
        </>
    );
}
