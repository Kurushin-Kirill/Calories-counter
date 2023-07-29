export default class Result {
    /**
     * Создает экземпляр класса Result.
     * @param {Element} element - Элемент представляющий блок с результатами.
     */
    constructor(element) {
        this.counter = element; // Элемент представляющий блок с результатами.

        this.root = element.querySelector(`.counter__result`); // Корневой элемент блока с результатами.
        this.caloriesNormOutput = this.root.querySelector(`#calories-norm`); // Элемент вывода нормы калорий.
        this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`); // Элемент вывода мин. значения калорий.
        this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`); // Элемент вывода макс. значения калорий.
    }

    /**
     * Отображение блока с результатами и вывод калорий.
     * @param {object} calories - Объект с данными о калориях (норма, мин. и макс. значения).
     */
    show(calories) {
        this.caloriesNormOutput.textContent = calories.norm;
        this.caloriesMinOutput.textContent = calories.minimal;
        this.caloriesMaxOutput.textContent = calories.maximal;
        this.root.classList.remove(`counter__result--hidden`);
    }

    /**
     * Скрытие блока с результатами и очистка значений.
     */
    hide() {
        this.caloriesNormOutput.textContent = 0;
        this.caloriesMinOutput.textContent = 0;
        this.caloriesMaxOutput.textContent = 0;
        this.root.classList.add(`counter__result--hidden`);
    }
}
