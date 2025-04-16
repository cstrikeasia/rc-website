import { NextRequest, NextResponse } from 'next/server'
import * as OTPAuth from 'otpauth'
import { getUserOtpSecret, markUserOtpEnabled } from '@/utils/otp-storage'

export async function POST(req: NextRequest) {
    const { userId, token } = await req.json()
    const secret = getUserOtpSecret(userId)
    if (!secret) {
        return NextResponse.json({ success: false, message: '尚未產生 OTP secret' })
    }
    const totp = new OTPAuth.TOTP({
        issuer: 'RiceCall',
        label: userId,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(String(secret)),
    })
    const isValid = totp.validate({ token, window: 1 }) !== null
    if (isValid) {
        markUserOtpEnabled(userId)
    }
    return NextResponse.json({
        success: isValid,
        message: isValid ? 'OTP 綁定成功' : '驗證失敗，請重試',
    })
}
