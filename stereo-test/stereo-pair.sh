#!/bin/bash

#L="HAI1-rectified.jpg-lines.jpg"
#R="HAI2-rectified.jpg-lines.jpg"
#L="braves-rectified-left.jpg"
#R="braves-rectified-right.jpg"
#L="summer-league-left.jpg"
#R="summer-league-right.jpg"
#L="phx1-left-rectified-lines.jpg"
#R="phx1-right-rectified-lines.jpg"
L="phx2-left-rectified-lines.jpg"
R="phx2-right-rectified-lines.jpg"
OUT="phx2.mp4"

ffmpeg -i $L -i $R -filter_complex hstack=inputs=2 -pix_fmt yuv420p $OUT
