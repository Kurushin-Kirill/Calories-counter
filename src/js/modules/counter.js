import Result from "./result.js";

/**
 * Данные для коэффициентов физической активности.
 * @enum {number}
 */
const PhysicalActivityRatio = {
    MIN: 1.2,
    LOW: 1.375,
    MEDIUM: 1.55,
    HIGH: 1.725,
    MAX: 1.9,
};

/**
 * Данные для факторов формулы расчета калорий.
 * @enum {number}
 */
const CaloriesFormulaFactor = {
    AGE: 5,
    WEIGHT: 10,
    HEIGHT: 6.25,
};

/**
 * Данные для констант формулы расчета калорий.
 * @enum {number}
 */
const CaloriesFormulaConstant = {
    MALE: 5,
    FEMALE: -161,
};

/**
 * Данные для коэффициентов мин. и макс. калорий.
 * @enum {number}
 */
const CaloriesMinMaxRatio = {
    MIN: 0.85,
    MAX: 1.15,
};

export default class Counter {
    /**
     * Создает экземпляр класса Counter.
     * @param {Element} element - Элемент представляющий счетчик.
     */
    constructor(element) {
        // Перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
        this.root = element;
        this.form = this.root.querySelector(`.counter__form`);
        this.elements = this.form.elements;
        this.parameters = this.elements.parameters.elements;
        this.parametersItems = [ ...this.parameters ];
        this.gender = this.elements.gender;
        this.age = this.elements.age;
        this.weight = this.elements.weight;
        this.height = this.elements.height;
        this.activity = this.elements.activity;
        this.submit = this.elements.submit;
        this.reset = this.elements.reset;

        this.result = new Result(this.root);

        this._onFormInput = this._onFormInput.bind(this);
        this._onFormReset = this._onFormReset.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
    }

    /**
     * Обработчик события ввода данных на форму.
     */
    _onFormInput() {
        /*
         * Получение данных от пользователя
         * Можно добавить небольшую валидацию
         */
        this.age.value = document.querySelector("#age").value;
        this.height.value = document.querySelector("#height").value;
        this.weight.value = document.querySelector("#weight").value;

        this.submit.disabled = !this.form.checkValidity();
        this.reset.disabled = !this.parametersItems.some(el => el.value);
    }

    /**
     * Обработчик события сброса данных формы.
     */
    _onFormReset() {
        // Задизабленность при обновлении страницы кнопок, скрытие блока с результатом
        this.reset.disabled = true;
        this.submit.disabled = true;
        this.result.hide();
    }

    /**
     * Обработчик события отправки данных формы.
     * @param {Event} evt - Объект события.
     */
    _onFormSubmit(evt) {
        /*
         * Вызов методов расчета калорий
         * getCaloriesNorm(), getCaloriesMin(), getCaloriesMax()
         * показ блока с результатами калорий
         */
        evt.preventDefault();
        const caloriesDataShow = {
            norm: this.getCaloriesNorm(),
            minimal: this.getCaloriesMin(),
            maximal: this.getCaloriesMax(),
        };
        this.result.show(caloriesDataShow);
    }

    /**
     * Инициализация счетчика
     */
    init() {
        /*
         * Инициализация обработчиков событий
         * _onFormInput, _onFormReset, _onFormSubmit
         */
        this.form.addEventListener(`input`, this._onFormInput);
        this.form.addEventListener(`reset`, this._onFormReset);
        this.form.addEventListener(`submit`, this._onFormSubmit);
    }

    /**
     * Деинициализация счетчика: удаление обработчиков событий.
     */
    deinit() {
        /*
         * Удаление обработчиков событий
         * _onFormInput, _onFormReset, _onFormSubmit
         */
        this.form.removeEventListener(`input`, this._onFormInput);
        this.form.removeEventListener(`reset`, this._onFormReset);
        this.form.removeEventListener(`submit`, this._onFormSubmit);
    }

    /**
     * Получение нормы калорий на основе введенных данных.
     * @returns {number} Норма калорий.
     */
    getCaloriesNorm() {
        /*
         * Перечисление констант age, weight, height, gender, activity
         * применение формулы расчета
         */
        const age = CaloriesFormulaFactor.AGE * this.age.value;
        const weight = CaloriesFormulaFactor.WEIGHT * this.weight.value;
        const height = CaloriesFormulaFactor.HEIGHT * this.height.value;
        const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
        const activity = PhysicalActivityRatio[this.activity.value.toUpperCase()];
        return Math.round((weight + height - age + gender) * activity);
    }

    /**
     * Получение мин. значения калорий на основе введенных данных.
     * @returns {number} Минимальное значение калорий.
     */
    getCaloriesMin() {
        return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN);
    }

    /**
     * Получение макс. значения калорий на основе введенных данных.
     * @returns {number} Максимальное значение калорий.
     */
    getCaloriesMax() {
        return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX);
    }
}
