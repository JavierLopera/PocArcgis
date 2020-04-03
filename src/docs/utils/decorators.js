import { action, decorate } from '@storybook/addon-actions';

export const customEventAction = (eventName) => (decorate([args => [args[0].detail]])).action(eventName);
