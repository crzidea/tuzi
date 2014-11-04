#!/bin/sh
sudo npm link
rm -rf tmp
mkdir tmp
cd tmp
tuzi
rm -rf node_modules/tuzi
ln -s ../../.. node_modules/tuzi
