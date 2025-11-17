// Components
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthSplitLayout
            title="Verifikasi email"
            description="Silakan verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirim ke email Anda."
        >
            <Head title="Verifikasi email" />

            {status === 'verification-link-sent' && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    Tautan verifikasi baru telah dikirim ke alamat email
                    yang Anda berikan saat pendaftaran.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button 
                            disabled={processing} 
                            variant="default"
                            className="h-12 w-full bg-green-700 hover:bg-green-800"
                        >
                            {processing && <Spinner className="mr-2" />}
                            Kirim ulang email verifikasi
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm font-medium hover:underline"
                        >
                            Keluar
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthSplitLayout>
    );
}
