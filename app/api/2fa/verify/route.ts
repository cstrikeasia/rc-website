import { NextRequest, NextResponse } from 'next/server'
import * as OTPAuth from 'otpauth'
import { getUserOtpSecret, setUserOtpSecret, markUserOtpEnabled, isUserOtpEnabled } from '@/utils/otp-storage'

export async function POST(req: NextRequest) {
    const { token, userId } = await req.json()
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
    const isValid = totp.validate({ token, window: 1 }) !== null
    if (isValid && !isUserOtpEnabled(userId)) {
        markUserOtpEnabled(userId)
    }
    return NextResponse.json({
        success: isValid,
        message: isValid
            ? isUserOtpEnabled(userId)
                ? 'OTP 綁定成功'
                : 'OTP 驗證成功'
            : '驗證失敗',
    })
}
