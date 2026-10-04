	function escapeHtml(value: string) {
		return value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	export function renderMarkdown(value: string) {
		if (!value.trim()) {
			return '<p class="empty-preview">작성한 내용이 여기에 표시됩니다.</p>';
		}

		let html = escapeHtml(value);

		html = html.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
		html = html.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
		html = html.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
		html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
		html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
		html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');

		html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');

		html = html.replace(/^\- (.*)$/gm, '<li>$1</li>');
		html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

		html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
		html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
		html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s]*?)\)/g, '<a href="$2" rel="nofollow noopener">$1</a>');

		html = html.replace(/\n{2,}/g, '</p><p>');
		html = html.replace(/\n/g, '<br>');

		return `<p>${html}</p>`;
	}
