# frozen_string_literal: true

# ======================================================================================================================
# Insertion Sort
#
# Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands. It has the big O
# notation of O(n^2). It works by iterating through the list, comparing each element with the one before it and
# inserting it in the correct position.
# ======================================================================================================================

list = []
(0...20).each { |i| list << i }
list.shuffle!

puts "Unsorted list: #{list}"

list.each_index do |index|
  next if index.zero?

  while !index.zero? && list[index] < list[index - 1]
    list[index], list[index - 1] = list[index - 1], list[index]
    index -= 1
  end
end

puts "Sorted list  : #{list}"
