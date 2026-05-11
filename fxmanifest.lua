fx_version "cerulean"
game "gta5"

lua54 "yes"

author "MRI Qbox Team"
description "Plugin Test — template de plugin pro mri_Qadmin"
version "__VERSION__"

ox_lib "locale"

shared_scripts {
    "@ox_lib/init.lua",
}

client_scripts {
    "client/*.lua",
}

server_scripts {
    "server/*.lua",
}

ui_page "html/index.html"

files {
    "html/**/*",
    "locales/*.json",
    "data/*.json",
}
