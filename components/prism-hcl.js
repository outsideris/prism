Prism.languages.hcl = {
	'comment': /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,
	'keyword': [
		{
			pattern: /(resource|data)\s+([\w-]+|"[\w-]+")(?=\s+"[\w-]+"\s+{)/i,
			inside: {
				'type': [
					{
						pattern: /(resource|data|\s+)([\w-]+|"[\w-]+")/i,
						lookbehind: true,
						alias: 'variable'
					}
                ]
			}
		},
		{
			pattern: /(provider|provisioner|variable|output|module|backend)\s+(")?([\w-]+)(")?\s+(?={)/i,
			inside: {
				'type': [
					{
						pattern: /(provider|provisioner|variable|output|module|backend)\s+(")?([\w-]+)(")?\s+/i,
						lookbehind: true,
						alias: 'variable'
					}
                ]
			}
		},
		{
			pattern: /([\w-]+)(?=\s+{)/
		}
	],
	'interpolation': [
		{
			pattern: /\${([\w[\](+)\-*%^"',?=:/\s]+\.?)+}/i,
			inside: {
				'type': [
					{
						pattern: /((terraform|var|self|count|module|path|data|local)\.)[\w\*]+/i,
						lookbehind: true,
						alias: 'variable'
					}
				],
				'keyword': /(terraform|var|self|count|module|path|data|local)/i,
				'operator': /\$\{|[}.]/,
				'function': [
					{
						pattern: /[\w]+(?=\()/,
						alias: 'variable'
					}
				],
				'string': /".*"/,
				'punctuation': /[!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]/,
				'number': /-?\d+\.?\d*/,
				'others': [
					{
						pattern: /[\w\*]+/,
						alias: 'string'
					}
				],
			},
		}
	],
	'property': [
		{
			pattern: /[\w-\.]+(?=\s*=)/i,
		},
		{
			pattern: /"[\w-\.]+"(?=\s*:)/i
		}
	],
	'string': /"(?:[^\n\r\\"]|\\.)*"/,
	'number': /(?:\d+e[+-]?\d+|0[0-7]+|0x[\da-f]+|\d+\.?\d*)/i,
	'boolean': /\b(?:true|false)\b/i
};
