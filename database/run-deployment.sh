#!/bin/bash

PGUSER="$USER" PGPASSWORD="$PASSWORD" sqitch --engine pg deploy --verify db:pg://$HOST:$PORT:$DATABASE