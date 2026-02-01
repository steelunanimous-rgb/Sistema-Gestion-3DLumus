import { NextResponse } from 'next/server'

export async function GET() {
    const envKeys = Object.keys(process.env);
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    const hasOracleUrl = !!process.env.ORACLE_DATABASE_URL;
    const hasPostgresUrl = !!process.env.POSTGRES_URL;

    return NextResponse.json({
        message: "Diagnóstico de Variables",
        available_variables_count: envKeys.length,
        checks: {
            DATABASE_URL: hasDatabaseUrl,
            ORACLE_DATABASE_URL: hasOracleUrl,
            POSTGRES_URL: hasPostgresUrl
        },
        // Solo mostramos las llaves, no los valores por seguridad
        all_keys: envKeys.filter(key =>
            key.includes('URL') ||
            key.includes('DATABASE') ||
            key.includes('POSTGRES')
        )
    })
}
