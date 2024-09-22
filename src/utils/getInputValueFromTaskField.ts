import { Tab } from '@/interfaces/task.type';
import { getQueryParamTab, getQueryParamTitle } from './taskQueryParams';

export default function getInputValueFromTaskField(tab: Tab, title: string) {
    let inputValue = '';

    if (tab) inputValue += `${getQueryParamTab(tab)} `;

    if (title) inputValue += `${getQueryParamTitle(title)} `;

    return inputValue.trim();
}
