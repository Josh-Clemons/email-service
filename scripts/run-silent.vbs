Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "C:\Users\Josh\Projects\email-service\scripts\run.bat" & Chr(34), 0
Set WshShell = Nothing