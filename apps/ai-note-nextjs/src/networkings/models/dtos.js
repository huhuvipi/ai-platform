
export class SummarizeRequest  {
    constructor({
        text,
        provider = 'gemini',
        language = 'English',
    }) {
        this.text = text;
        this.provider = provider;
        this.language = language;
    }

    toJSON() {
        return {
            text: this.text,
            provider: this.provider,
            language: this.language
        };
    }
};

export class SummarizeResponse  {
    constructor({
        provider,
        language,
        result
    }) {
        this.provider = provider;
        this.language = language;
        this.result = result;
    }

    fromJSON(json) {
        return new SummarizeResponse({
            provider: json.provider,
            language: json.language,
            result: json.result
        });
    }
}