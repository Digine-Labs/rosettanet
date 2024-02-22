export function hexPadding(value: string, targetLength: number): string {
    if (!isHex(value) || value.length > targetLength){
        return value
    }
    if(value.startsWith("0x")){
        return "0x" + value.padStart(targetLength, "0");
    }
    return value.padStart(targetLength, "0");
    
}

// Also account of 0x prefix
function isHex(h: string): boolean {
    return /^0x[0-9A-Fa-f]*$/.test(h);
}