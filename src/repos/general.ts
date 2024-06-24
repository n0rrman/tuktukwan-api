export const superMemoCalc = (grade: number, streak: number, interval: number, easiness: number) => {
    const q = grade;
    let n = streak;
    let EF = easiness;
    let I = interval;

    if (q >= 3) {
        if (n === 0) {
            I = 1;
        } else if (n === 1) {
            I = 6;
        } else {
            I = Math.round(I * EF)
        }
        n++;
    } else {
        n = 0;
        I = 1;
    }

    EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (EF < 1.3) {
        EF = 1.3
    }

    return { n, EF, I }
}

