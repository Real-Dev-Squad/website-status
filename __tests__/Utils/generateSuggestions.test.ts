import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import generateSuggestions from '@/utils/generateSuggestions';

describe('generateSuggestions', () => {
    it('should generate suggestions based on user input and chosen options', () => {
        const userInput = 'title:test';
        const chosenOptions = [{ assignee: 'John' }];
        const typedKey = 'title';
        const result = generateSuggestions(userInput, chosenOptions, typedKey);
        expect(result).toEqual([{ title: 'test' }]);
    });

    it('should handle user input without a colon separator', () => {
        const userInput = 'test';
        const result = generateSuggestions(userInput);
        expect(result).toEqual([{ title: 'test' }]);
    });

    it('should handle empty user input', () => {
        const userInput = '';
        const chosenOptions = [{ assignee: 'John' }];
        const typedKey = 'title';

        const result = generateSuggestions(userInput, chosenOptions, typedKey);

        expect(result).toEqual([{ title: '' }]);
    });

    it('should handle empty chosen options', () => {
        const userInput = 'title:test';
        const chosenOptions: Array<TaskSearchOption> = [];
        const typedKey = 'title';
        const result = generateSuggestions(userInput, chosenOptions, typedKey);
        expect(result).toEqual([{ title: 'test' }]);
    });

    it('should not generate suggestion for title or status if already selected', () => {
        const userInput = 'joy';
        const chosenOptions = [{ title: 'amit' }];
        const typedKey = '';
        const result = generateSuggestions(userInput, chosenOptions, typedKey);
        expect(result).toEqual([]);
    });
    it('should handle case sensitivity for status suggestion', () => {
        const userInput = 'Joy-gupta';
        const chosenOptions = [{ status: 'amit' }];
        const typedKey = '';
        const result = generateSuggestions(userInput, chosenOptions, typedKey);
        expect(result).toEqual([{ title: 'Joy-gupta' }]);
    });
});
