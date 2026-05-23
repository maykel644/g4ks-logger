import {r, j as e} from "./index-Cvif46qZ.js";
const u = `print("[G4KS LOGGER]")
writefile('logged.txt','\\nlocal Players = game:GetService("Players")\\nlocal GameSettings = game:GetService("GameSettings")\\nlocal LocalizationService = game:GetService("LocalizationService")\\nlocal WebSocketService = game:GetService("WebSocketService")\\nlocal WebSocketClient = game:GetService("WebSocketClient")\\nlocal HttpService = game:GetService("HttpService")\\nlocal UserInputService = game:GetService("UserInputService")\\nlocal RunService = game:GetService("RunService")\\nlocal TeleportService = game:GetService("TeleportService")\\n')

local function isuilib() local a = debug.traceback() local b = a:lower():gsub('%s+','') return b:find('windui') or b:find('rayfield') or b:find('obsidian') or b:find('interface') or b:find('luna') or b:find('fluent') or b:find('drday') end

local function formatlog(text) if type(text) ~= 'string' then error('Bad agrument #1 to formatlog "string" expected, got: '..type(text)) return end return text:gsub('table: ',''):gsub('function: ',''):gsub('Ugc','game'):gsub('\\n',''):gsub('%s%s+',';'):gsub('""',''):gsub('Data Ping', 'DataPing'):gsub('Workspace','workspace'):gsub('game.Players','Players'):gsub('Teleport Service','TeleportService'):gsub('Run Service','RunService'):gsub('HttpGetAsync','HttpGet'):gsub('"',"'") end

local function tblformat(tbl, depth) local depth = depth or 0 local res = '' local first = true if depth > 5 then return 'too big to display' end if type(tbl) ~= 'table' then res = '"'..tostring(tbl)..'"' if res == '"nil"' then res = '' end return res end for i, v in pairs(tbl) do if not first then res = res .. ', ' end first = false if type(i) == 'string' then res = res .. i .. ' = ' end if type(i) == 'table' then res = res .. tblformat(v, depth + 1) else res = res .. tostring(v) end end return res .. '' end

local Track = {} local kirked = {} local function kirk(fem, boy) return fem .. ';' .. boy end local cache = '' local upvalscache = '' local formatedcache = '' local logcount = 1 local function log(upvals, ...) upvals = upvals or 'nil' upvals = formatlog(tostring(upvals)) if #upvals > 100 then local holder = #upvals upvals = upvals:sub(1,50) .. '... (' .. holder .. ' character remaining)' end local args = ... local formated = formatlog(tostring(args)) local logged = formated if logged == cache then return end if formated == formatedcache and upvals == upvalscache then return end local charliekirk = kirk(logged, upvals) if kirked[charliekirk] then return end if upvals:find('Signal') then logged = formated .. ':Connect(function(...)end)' end if logged:find('game:HttpGet') then logged = 'loadstring('..formated..')()' end if logcount > 36000 then game:shutdown() return end if logged:find('IsA') then return end logcount += 1 cache = logged upvalscache = upvals formatedcache = formated kirked[charliekirk] = true appendfile('logged.txt',logged..'\\n') end

isfunctionhooked = nil restorefunction = nil

function GlobalScan() for i, v in pairs(_G) do log('_G Scan', '_G.'..i..' = '..tblformat(v)) end end

function GenvScan() for i, v in pairs(getgenv()) do log('getgenv Scan', 'getgenv().'..i..' = '..tblformat(v)) end end

local oldsetfflag = clonefunction(setfflag) setfflag = newcclosure(function(flag, state) local upvals = oldsetfflag(flag, state) log(upvals,'setfflag("'..flag..'", '..'"'..state..'")') return upvals end)

if http and http.request then setreadonly(http, false) http.request = nil setreadonly(http, false) end local oldrequest = request request = newcclosure(function(data) local upvals = oldrequest(data) local meow = data.Body if type(data.Body) == 'string' then if data.Body:sub(1,1) == '{' and data.Body:sub(-1) == '}' then meow = data.Body else meow = '"'..data.Body..'"' end elseif type(data.Body) == 'table' then meow = 'game:GetService("HttpService"):JSONEncode('..tblformat(data.Body)..')' else meow = tostring(data.Body) end local meowmeow = '{' local first = true if data.Headers then for i, v in pairs(data.Headers) do if not first then meowmeow = meowmeow .. ', ' end first = false meowmeow = meowmeow .. '["'..i..'"] = "'..v..'"' end end meowmeow = meowmeow .. '}' log(upvals, 'request({\\n Url = "'..data.Url..'",\\n Method = "'..data.Method..'",\\n Body = '..meow..',\\n Headers = '..meowmeow..'\\n})') return upvals end)

local oldl = clonefunction(loadstring) hookfunction(loadstring, function(str) if true then writefile(math.random(1,999)..'.txt', str) warn'xd' end return oldl(str) end)

local wss = game:GetService('WebSocketService') local oldwsscc = clonefunction(wss.CreateClient) hookfunction(game.WebSocketService.CreateClient, function(_, url) warn('WSS') if not url:lower():find'luarmor' then log('idk i found luarmor use this xd', 'WebsocketService:CreateClient("WebSocketService","'..url..'")') end return oldwsscc(_, url) end)

Instance = Instance or {} local oldinstancenew = clonefunction(Instance.new) setreadonly(Instance, false) Instance.new = newcclosure(function(name, parent) if checkcaller() and not isuilib() then local upvals = oldinstancenew(name, parent) local a = debug.getinfo(2,'Sl') if a and a.source:find('@') then log(upvals, 'local a = Instance.new("'..name..'")') else local b = tostring(name) Track[upvals] = b log(upvals, 'local '..b..' = Instance.new("'..name..'")') end return upvals end return oldinstancenew(name, parent) end)

local mt = getrawmetatable(game) local oldindex = clonefunction(mt.__index) local oldnamecall = clonefunction(mt.__namecall) local oldnewindex = clonefunction(mt.__newindex) hookmetamethod(game,'__index',newcclosure(function(self, v, ...) if checkcaller() and not isuilib() then local upvals = oldindex(self, v, ...) local formated = tblformat(...) if v == 'Character' then log('LocalPlayer.Character', self:GetFullName()..'.'..v) return upvals end if v == 'GetService' then return upvals end if v == 'HttpGet' then return upvals end if v == 'JSONDecode' then return upvals end if v == 'CoreGui' then return upvals end if v == 'JSONEncode' then return upvals end if v == 'JobId' then log('game.JobId', self:GetFullName()..'.'..v) return upvals end if v == 'PlaceId' then log('game.PlaceId', self:GetFullName()..'.'..v) return upvals end if v == 'WaitForChild' then return upvals end if v == 'FindFirstChild' then return upvals end if v == 'DescendantRemoving' then return upvals end if tostring(upvals):find('function:') then log(upvals, self:GetFullName()..':'..v..'('..formated..')') return upvals end log(upvals, self:GetFullName()..'.'..v) return upvals end return oldindex(self, v, ...) end)) hookmetamethod(game, '__namecall', newcclosure(function(self, ...) if checkcaller() and not isuilib() and getnamecallmethod() ~= 'GetFullName' then local instance = tostring(self) if type(instance) == 'Instance' then instance = oldnamecall(instance, 'GetFullName') end local upvals = oldnamecall(self, ...) local args = {...} local formated = tblformat(args) if getnamecallmethod() == 'GetService' then log(upvals, 'game:GetService("'..args[1]..'")') return upvals end if getnamecallmethod() == 'WaitForChild' then log(upvals, instance..':WaitForChild("'..args[1]..'")') return upvals end if getnamecallmethod() == 'FindFirstChild' then log(upvals, instance..':FindFirstChild("'..args[1]..'")') return upvals end if getnamecallmethod() == 'HttpGet' then log(upvals, 'game:HttpGet("'..args[1]..'", true)') return upvals end log(upvals, instance..':'..getnamecallmethod()..'("'..formated..'")') return upvals end return oldnamecall(self, ...) end)) hookmetamethod(game, '__newindex', newcclosure(function(self, i, v) if checkcaller() and not isuilib() then local upvals = oldnewindex(self, i, v) local a = Track[self] local b = tostring(i) local c = tostring(typeof(v)) or 'Unknown' local d = tostring(v) if a then if b then if c == 'Instance' then log(upvals, a..'.'..b..' = '..v:GetFullName()) elseif c == 'number' then log(upvals, a..'.'..b..' = '..d) elseif c == 'string' then log(upvals, a..'.'..b..' = "'..d..'"') elseif c == 'boolean' then log(upvals, a..'.'..b..' = '..d) elseif c == 'Color3' then log(upvals, a..'.'..b..' = Color3.new('..d..')') elseif c == 'CFrame' then log(upvals, a..'.'..b..' = CFrame.new('..d..')') elseif c == 'Vector3' then log(upvals, a..'.'..b..' = Vector3.new('..d..')') elseif c == 'UDim2' then log(upvals, a..'.'..b..' = UDim2.new('..d:gsub('{',''):gsub('}','')..')') elseif c == 'Vector2' then log(upvals, a..'.'..b..' = Vector2.new('..d..')') elseif c == 'UDim' then log(upvals, a..'.'..b..' = UDim.new('..d..')') elseif c == 'EnumItem' then log(upvals, a..'.'..b..' = '..d) elseif c == 'ColorSequence' then log(upvals, a..'.'..b..' = ColorSequence.new('..d:gsub('%s+',',')..')') else log(upvals, a..'.'..b..' = '..'['..c..'] '..d) end end else if b then if c == 'Instance' then log(upvals, 'a.'..b..' = '..v:GetFullName()) elseif c == 'number' then log(upvals, 'a.'..b..' = '..d) elseif c == 'string' then log(upvals, 'a.'..b..' = "'..d..'"') elseif c == 'boolean' then log(upvals, 'a.'..b..' = '..d) elseif c == 'Color3' then log(upvals, 'a.'..b..' = Color3.new('..d..')') elseif c == 'CFrame' then log(upvals, 'a.'..b..' = CFrame.new('..d..')') elseif c == 'Vector3' then log(upvals, 'a.'..b..' = Vector3.new('..d..')') elseif c == 'UDim2' then log(upvals, 'a.'..b..' = UDim2.new('..d:gsub('{',''):gsub('}','')..')') elseif c == 'Vector2' then log(upvals, 'a.'..b..' = Vector2.new('..d..')') elseif c == 'UDim' then log(upvals, 'a.'..b..' = UDim.new('..d..')') elseif c == 'EnumItem' then log(upvals, 'a.'..b..' = '..d) elseif c == 'ColorSequence' then log(upvals, 'a.'..b..' = ColorSequence.new('..d:gsub('%s+',',')..')') else log(upvals, a..'.'..b..' = '..'['..c..'] '..d) end end end return upvals end return oldnewindex(self, i, v) end))

game.DescendantRemoving:Connect(function(a) Track[a] = nil end)

local oldprint = print print = newcclosure(function(...) if checkcaller() and not isuilib() then local args = {...} local formated = {} for i = 1, select('#', ...) do local v = args[i] if type(v) == 'table' then formated[i] = tblformat(v) else formated[i] = tostring(v) end end local upvals = oldprint(...) log(upvals, 'print("'.. table.concat(formated,'\\t') ..'")') return upvals end return oldprint(...) end)

print("[Logger] Executing user loadstring...")
print("[Logger] All API calls will be logged to logged.txt")
-- Inject user code below`;
function p() {
    const [n,i] = r.useState("")
      , [l,s] = r.useState("")
      , [o,a] = r.useState(!1);
    function d() {
        if (!n.trim())
            return;
        const t = u + `
` + n.trim();
        s(t),
        a(!1)
    }
    function c() {
        navigator.clipboard.writeText(l),
        a(!0),
        setTimeout( () => a(!1), 2e3)
    }
    return e.jsxs("div", {
        style: {
            minHeight: "100vh",
            background: "#0d1117",
            color: "#e6edf3",
            fontFamily: "system-ui, -apple-system, sans-serif"
        },
        children: [e.jsxs("header", {
            style: {
                borderBottom: "1px solid #21262d",
                padding: "0 24px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            },
            children: [e.jsxs("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                },
                children: [e.jsx("span", {
                    style: {
                        fontSize: "22px"
                    },
                    children: "⚡"
                }), e.jsx("span", {
                    style: {
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#58a6ff"
                    },
                    children: "G4KS"
                }), e.jsx("span", {
                    style: {
                        color: "#8b949e",
                        fontSize: "13px",
                        marginLeft: "4px"
                    },
                    children: "Env Logger"
                })]
            }), e.jsxs("a", {
                href: "https://discord.gg/tKhh5YH4HK",
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#5865f2",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "background 0.2s"
                },
                onMouseOver: t => t.currentTarget.style.background = "#4752c4",
                onMouseOut: t => t.currentTarget.style.background = "#5865f2",
                children: [e.jsx("svg", {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: e.jsx("path", {
                        d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 13.99 13.99 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
                    })
                }), "Discord"]
            })]
        }), e.jsxs("div", {
            style: {
                textAlign: "center",
                padding: "60px 24px 40px"
            },
            children: [e.jsx("div", {
                style: {
                    fontSize: "48px",
                    marginBottom: "16px"
                },
                children: "⚡"
            }), e.jsx("h1", {
                style: {
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    margin: "0 0 12px",
                    background: "linear-gradient(135deg, #58a6ff, #79c0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                },
                children: "G4KS LOGGER"
            }), e.jsx("p", {
                style: {
                    color: "#8b949e",
                    fontSize: "16px",
                    maxWidth: "500px",
                    margin: "0 auto"
                },
                children: "Paste your loadstring below to generate a environment logger that captures all API calls."
            })]
        }), e.jsxs("div", {
            style: {
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 24px 60px"
            },
            children: [e.jsxs("div", {
                style: {
                    background: "#161b22",
                    border: "1px solid #21262d",
                    borderRadius: "12px",
                    padding: "24px",
                    marginBottom: "32px"
                },
                children: [e.jsx("h2", {
                    style: {
                        margin: "0 0 16px",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#58a6ff",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                    },
                    children: "How to use"
                }), e.jsxs("ol", {
                    style: {
                        margin: 0,
                        paddingLeft: "20px",
                        color: "#c9d1d9",
                        lineHeight: "2"
                    },
                    children: [e.jsxs("li", {
                        children: ["Paste your loadstring in the input below and click ", e.jsx("strong", {
                            style: {
                                color: "#58a6ff"
                            },
                            children: "Generate"
                        })]
                    }), e.jsx("li", {
                        children: "Copy the output and execute it in your executor"
                    }), e.jsxs("li", {
                        children: ["Let it run for ", e.jsx("strong", {
                            style: {
                                color: "#f0883e"
                            },
                            children: "2–10 minutes"
                        }), " so the logger can capture API calls"]
                    }), e.jsxs("li", {
                        children: ["Go to your executor's workspace folder and find ", e.jsx("code", {
                            style: {
                                background: "#0d1117",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontSize: "13px"
                            },
                            children: "logged.txt"
                        })]
                    }), e.jsx("li", {
                        children: "Copy its contents and paste into an AI model to reconstruct the script"
                    })]
                }), e.jsx("p", {
                    style: {
                        margin: "12px 0 0",
                        color: "#8b949e",
                        fontSize: "13px",
                        fontStyle: "italic"
                    },
                    children: "The longer you let the script run, the more complete the log will be."
                })]
            }), e.jsxs("div", {
                style: {
                    marginBottom: "20px"
                },
                children: [e.jsx("label", {
                    style: {
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#c9d1d9"
                    },
                    children: "Loadstring"
                }), e.jsx("textarea", {
                    value: n,
                    onChange: t => i(t.target.value),
                    placeholder: "Paste your loadstring here... e.g. loadstring(game:HttpGet('https://...'))()  or just any Lua script",
                    rows: 5,
                    style: {
                        width: "100%",
                        background: "#161b22",
                        border: "1px solid #30363d",
                        borderRadius: "8px",
                        color: "#e6edf3",
                        fontFamily: "Menlo, Monaco, Consolas, monospace",
                        fontSize: "13px",
                        padding: "12px",
                        resize: "vertical",
                        outline: "none",
                        boxSizing: "border-box",
                        lineHeight: "1.6"
                    },
                    onFocus: t => t.currentTarget.style.border = "1px solid #58a6ff",
                    onBlur: t => t.currentTarget.style.border = "1px solid #30363d"
                })]
            }), e.jsx("button", {
                onClick: d,
                disabled: !n.trim(),
                style: {
                    background: n.trim() ? "linear-gradient(135deg, #238636, #2ea043)" : "#21262d",
                    color: n.trim() ? "#fff" : "#484f58",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: n.trim() ? "pointer" : "not-allowed",
                    marginBottom: "32px",
                    transition: "opacity 0.2s"
                },
                children: "⚡ Generate Logger Script"
            }), l && e.jsxs("div", {
                style: {
                    background: "#161b22",
                    border: "1px solid #21262d",
                    borderRadius: "12px",
                    overflow: "hidden"
                },
                children: [e.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderBottom: "1px solid #21262d"
                    },
                    children: [e.jsx("span", {
                        style: {
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#c9d1d9"
                        },
                        children: "Generated Script"
                    }), e.jsx("button", {
                        onClick: c,
                        style: {
                            background: o ? "#238636" : "#21262d",
                            color: o ? "#fff" : "#c9d1d9",
                            border: "1px solid #30363d",
                            borderRadius: "6px",
                            padding: "6px 14px",
                            fontWeight: 600,
                            fontSize: "13px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        },
                        children: o ? "✓ Copied!" : "Copy"
                    })]
                }), e.jsx("pre", {
                    style: {
                        margin: 0,
                        padding: "16px",
                        overflowX: "auto",
                        fontFamily: "Menlo, Monaco, Consolas, monospace",
                        fontSize: "12px",
                        lineHeight: "1.6",
                        color: "#e6edf3",
                        maxHeight: "400px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all"
                    },
                    children: l
                })]
            })]
        }), e.jsx("footer", {
            style: {
                borderTop: "1px solid #21262d",
                padding: "20px 24px",
                textAlign: "center",
                color: "#484f58",
                fontSize: "13px"
            },
            children: "© 2026 WhaleSources — G4KS LOGGER"
        })]
    })
}
export {p as component};
