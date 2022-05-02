# frozen_string_literal: true

# ======================================================================================================================
# Selection sort is a sorting algorithm that works by repeatedly finding the minimum element (considering ascending
# order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.
#
# 1) The subarray which is already sorted.
# 2) Remaining subarray which is unsorted.
#
# In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray
# is picked and moved to the sorted subarray.
# ======================================================================================================================

list = []
26.times do
  list << rand(100)
end

puts "Unsorted list: #{list}"

list.each_index do |i|
  min = i
  ((i + 1)..(list.length - 1)).each do |j|
    min = j if list[j] < list[min]
  end
  list[i], list[min] = list[min], list[i]
end

sorted = true

list.each_index do |idx|
  next if idx.zero?

  if list[idx] < list[idx - 1]
    sorted = false
    break
  end
end

puts "Sorted list  : #{list}"
puts "Sorted?      : #{sorted}"
