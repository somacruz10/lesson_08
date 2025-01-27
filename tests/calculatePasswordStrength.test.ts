import { calculatePasswordStrength } from '../src/calculatePasswordStrength';


describe('calculatePasswordStrength', () => {
    test('should return "Very Weak" for passwords with less than 8 characters', () => {
        expect(calculatePasswordStrength('short')).toBe('Very Weak');
        expect(calculatePasswordStrength('12345')).toBe('Very Weak');
        expect(calculatePasswordStrength('password')).toBe('Very Weak'); // Только строчные буквы
        expect(calculatePasswordStrength('')).toBe('Very Weak'); // Пустая строка
    });

    test('should return "Weak" for passwords with basic length and one other criteria', () => {
        expect(calculatePasswordStrength('aaaaaaaaaaaa')).toBe('Weak'); // Только строчные буквы
        expect(calculatePasswordStrength('123456789101112')).toBe('Weak'); // Только цифры
        expect(calculatePasswordStrength('password1')).toBe('Weak'); // Буквы и цифра
        expect(calculatePasswordStrength('PASSw1')).toBe('Weak'); // Большие буквы, маленькая буква и цифра
        expect(calculatePasswordStrength('PAS1!')).toBe('Weak'); // Большие буквы, цифра и символ
        expect(calculatePasswordStrength('A1!')).toBe('Weak'); // Очень короткий пароль, несмотря на сложность
    });

    test('should return "Moderate" for passwords meeting 3-4 criteria', () => {
        expect(calculatePasswordStrength('Pass1234')).toBe('Moderate'); // Прописные, строчные, цифры
        expect(calculatePasswordStrength('pass!123')).toBe('Moderate'); // Строчные, цифры, специальные символы
        expect(calculatePasswordStrength('PAssWORD!')).toBe('Moderate'); // Прописные, строчные, цифры и специальные символы
    });

    test('should return "Strong" for passwords meeting 5 or more criteria', () => {
        expect(calculatePasswordStrength('Pass1234!')).toBe('Strong'); // Прописные, строчные, цифры, спецсимволы, длина >= 8
        expect(calculatePasswordStrength('Str0ngP@ssw0rd')).toBe('Strong'); // Все критерии, включая длину >= 12
    });

});