import Clipboard from 'clipboard';
import { useMessage } from '../hooks/web/useMessage';

const { createMessage } = useMessage();
export default function () {
  const clipboard = new Clipboard('.tag-read');
  clipboard.on('success', () => {
    console.log('复制成功');
    createMessage.success({
      content: '复制成功',
      position: 'topRight',
      timeout: 1.5 * 1000,
    });
    // 释放内存
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    // 不支持复制
    console.log('该浏览器不支持自动复制');
    // 释放内存
    clipboard.destroy();
  });
}
