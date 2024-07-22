export default function createId(str) {
    const randomValue = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now().toString(36);
    return randomValue;
}