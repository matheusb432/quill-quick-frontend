import { apiUtil } from '../api-util';

describe('api-util', () => {
  describe('buildNotifications', () => {
    it('should build success notifications', () => {
      const notifications = apiUtil.buildNotifications('Test');
      expect(notifications.success.create).toBe('Test created successfully!');
      expect(notifications.success.update).toBe('Test updated successfully!');
      expect(notifications.success.delete).toBe('Test deleted successfully!');
      expect(notifications.success.duplicate).toBe('Test duplicated successfully!');
    });
  });
});
