import './statist-page.scss';

import Control from '../../../common/control';
import { ArticleMetaData, CategoriesType } from '../../../common/state-types';
import { state } from '../../../common/state';
import { DataController } from '../../../api/data-controller';

export class StatistPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container py-5');
    this.renderStatisticHeader();
    this.renderCategories();
  }

  private renderStatisticHeader(): void {
    const user = state.getUser();
    const doneLessonsCount = user.done.lessons.length;
    const doneTestsCount = user.done.tests.length;
    const doneTasksCount = user.done.tasks.length;

    const row = new Control(this.node, 'div', 'row mb-5');

    const col1 = new Control(row.node, 'div', 'col');
    new Control(col1.node, 'h2', 'text-center', 'ПРОЧИТАНО');
    new Control(col1.node, 'p', 'text-center', `${doneLessonsCount}`);
    new Control(col1.node, 'p', 'text-center', 'уроков');

    const col2 = new Control(row.node, 'div', 'col');
    new Control(col2.node, 'h2', 'text-center', 'ПРОЙДЕНО');
    new Control(col2.node, 'p', 'text-center', `${doneTestsCount}`);
    new Control(col2.node, 'p', 'text-center', 'тестов');

    const col3 = new Control(row.node, 'div', 'col');
    new Control(col3.node, 'h2', 'text-center', 'РЕШЕНО');
    new Control(col3.node, 'p', 'text-center', `${doneTasksCount}`);
    new Control(col3.node, 'p', 'text-center', 'задач');
  }

  private async renderCategories(): Promise<void> {
    const categories = await DataController.getCategories();
    const categoryListGroup = new Control(this.node, 'ul', 'list-group');
    categories.forEach((e) => {
      const categoryListGroupItem = new Control(categoryListGroup.node, 'li', 'list-group-item fs-2 py-3', e.name);
      const elementListGroup = new Control(categoryListGroupItem.node, 'ul', 'list-group list-group-item-light mt-3');
      const lessons = new Control(elementListGroup.node, 'li', 'list-group-item fs-4', 'Уроки');
      const lessonsProgress = this.getProgressValue(e.lessons, 'lessons');
      this.renderProgress(lessons.node, lessonsProgress);
      const tests = new Control(elementListGroup.node, 'li', 'list-group-item fs-4', 'Тесты');
      const testsProgress = this.getProgressValue(e.tests, 'tests');
      this.renderProgress(tests.node, testsProgress);
      const tasks = new Control(elementListGroup.node, 'li', 'list-group-item fs-4', 'Задачи');
      const tasksProgress = this.getProgressValue(e.tasks, 'tasks');
      this.renderProgress(tasks.node, tasksProgress);
    });
  }

  private getProgressValue(items: Array<ArticleMetaData>, type: keyof CategoriesType): number {
    const allItemsCount = items.length;
    const doneItems = state.getUser().done[type] as Array<ArticleMetaData>;
    let doneItemsCount = 0;
    items.forEach((item) => {
      doneItems.forEach((doneItem) => {
        if (item.id === +doneItem.id) {
          doneItemsCount += 1;
        }
      });
    });
    return doneItemsCount ? Math.round((doneItemsCount / allItemsCount) * 100) : 0;
  }

  private renderProgress(parent: HTMLElement, progressValue: number): void {
    const progress = new Control(parent, 'div', 'progress');
    const progressBar = new Control(
      progress.node,
      'div',
      'progress-bar progress-bar-striped progress-bar-animated',
      `${progressValue}%`
    );
    progressBar.node.setAttribute('role', 'progressbar');
    progressBar.node.setAttribute('style', `width: ${progressValue}%`);
    progressBar.node.setAttribute('aria-valuenow', `${progressValue}`);
    progressBar.node.setAttribute('aria-valuemin', '0');
    progressBar.node.setAttribute('aria-valuemax', '100');
  }
}
