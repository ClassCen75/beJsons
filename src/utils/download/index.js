//JSON文件生成
export default function downloadJson(data, filename) {
  // 将JSON对象转换成字符串
  const jsonString = JSON.stringify(data, null, 2);
  // 创建一个Blob对象，类型为application/json
  const blob = new Blob([jsonString], { type: 'application/json' });
  // 创建一个指向该Blob的URL
  const url = URL.createObjectURL(blob);

  // 创建一个临时的a标签用于触发下载
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download.json';

  // 将a标签插入到文档中并模拟点击
  document.body.appendChild(a);
  a.click();

  // 清理并移除创建的URL和a标签
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
