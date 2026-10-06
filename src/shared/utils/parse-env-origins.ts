export function parseEnvOrigins(...origins:(string | undefined)[]) {
    const out:string[] = [];

    for (const origin of origins) {
        if (!origin) continue;

        for ( const o of origin.split(',')) {
            const trimmed = o.trim();

            if (trimmed) {
                out.push(trimmed);
            }      
        }
    }
    
    return [...new Set(out)];
}  