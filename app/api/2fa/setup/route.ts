import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'
import { NextRequest, NextResponse } from 'next/server'
import { getUserOtpSecret, setUserOtpSecret } from '@/utils/otp-storage'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }
    let base32Secret = getUserOtpSecret(userId)
    if (!base32Secret) {
        const secret = new OTPAuth.Secret({ size: 20 })
        base32Secret = secret.base32
        setUserOtpSecret(userId, base32Secret)
    }
    const totp = new OTPAuth.TOTP({
        issuer: 'RiceCall',
        label: userId,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(base32Secret),
    })
    const otpUrl = totp.toString()
    const qrCodeDataUrl = await QRCode.toDataURL(otpUrl)
    return NextResponse.json({
        secret: base32Secret,
        otpUrl,
        qr: qrCodeDataUrl,
    })
}
