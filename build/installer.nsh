RequestExecutionLevel admin

!macro customUnWelcomePage
    !define MUI_WELCOMEPAGE_TITLE "custom title for uninstaller welcome page"
    !define MUI_WELCOMEPAGE_TEXT "custom text for uninstaller welcome page $\r$\n more"
    !insertmacro MUI_UNPAGE_WELCOME
!macroend


!macro customUnInstall
  DetailPrint "Menghapus Task Scheduler..."

  nsExec::ExecToLog 'schtasks /delete /tn "tes" /f'
  
  Pop $0
  StrCmp $0 "0" 0 +2
  DetailPrint "Task Scheduler berhasil dihapus."
!macroend