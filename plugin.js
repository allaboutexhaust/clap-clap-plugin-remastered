/**
 * @name ClapClapPluginRemastered
 * @authorLink https://github.com/exsocket
 * @website https://whores.best
 */

module.exports = (() =>
{
    const config =
    {
		info:
		{
			name: "ClapClapPluginRemastered",
			authors:
			[
				{
					name: "pedzio",
					discord_id: "894433798836613160",
					github_username: "devpedzio",
					twitter_username: "devpedzio"
				}
			],
			version: "1.0.0",
			description: "Useless plugin. | cw?, sc?, c? - 👏 claps 👏 message 👏 | b? - changes every b to 🅱️ | owo? - makes message mowe cute TvT | rev? - reverses message | ra? - sends bigger messages |",
			github: "https://github.com/devpedzio/clap-clap-plugin-remastered/blob/main/clap.plugin.js",
			github_raw: "https://raw.githubusercontent.com/devpedzio/clap-clap-plugin-remastered/main/clap.plugin.js"
		},
		changelog:
		[
			{
				title: "1.0.0",
				type: "added",
				items:
				[
					"Added 'cw?' option. This will capitalize every other letter in your message, showing that you are, in fact, the most intelligent and dominant person in chat."
				]
			}
		]
    };

    return (([Plugin, Api]) => {

		const plugin = (Plugin, Api) =>
		{
			const { DiscordModules, Patcher } = Api;

			return class ClapClapPluginRemastered extends Plugin
			{
				constructor()
				{
					super();
				}
	
				onStart()
				{
					Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) =>
					{
						const content = message.content.toLowerCase();
						const clapclap = (/^c(\S| )*\?/g).exec(content) || (/^sc(\S| )*\?/g).exec(content);
						
						if (clapclap)
						{	
							const filler = clapclap[0].includes("(") && clapclap[0].includes(")")
								? clapclap[0].substr(clapclap[0].indexOf("(") + 1, clapclap[0].indexOf(")") - clapclap[0].indexOf("(") - 1)
								: " :clap: ";
								
							message.content = message.content.substr(clapclap[0].length, message.content.length)
								.split(clapclap[0].startsWith("super") ? "" : " ")
								.join(filler);
								
							message.content = filler + message.content + filler;

							return;
						}

						switch (content.split("?")[0])
						{
							case "ra":
								const ra = (/^ra\?/g).exec(content);

								message.content = message.content.toLowerCase().substr(ra[0].length, message.content.length)
									.split(" ")
									.join("\t")
									.replace(/[A-Za-z]/g, x => ` :regional_indicator_${x.toLowerCase()}: `);
								
								break;

							case "rev":
								const rev = (/^rev\?/g).exec(content);

								message.content = message.content.substr(reverse[0].length, message.content.length)
									.split("")
									.reverse()
									.join("");

								break;

							case "owo":
								const owo = (/^owo\?/g).exec(content);

								message.content = message.content.substr(owo[0].length, message.content.length)
									.replace(/r/g, "w")
									.replace(/R/g, "W")
									.replace(/l/g, "w")
									.replace(/L/g, "W")
									.replace(/ n/g, " ny")
									.replace(/ N/g, " Ny")
									.replace(/ove/g, "uv")
									.replace(/OVE/g, "UV")
									+ " " + ["owo", "OwO", "uwu", "UwU", ">w<", "^w^", "♥w♥"][7 * Math.random() << 0];

								break;

							case "b":
								const b = (/^b\?/g).exec(content);

								message.content = message.content.substr(b[0].length, message.content.length)
									.replace(/b/g, ":b:");

								break;
							
							case "cw":
								const woke = (/^cw\?/g).exec(content);

								message.content = message.content.substr(woke[0].length, message.content.length)
									.replace(/.{2}/gm, c => c[0].toUpperCase() + c[1].toLowerCase());

								break;
						}
					});
				}
	
			}
		};

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
