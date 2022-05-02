# frozen_string_literal: true

# ======================================================================================================================
# Binary search is a search algorithm that works by comparing the target value to the value of the middle element of
# the array. If the target value is less than the middle element, then the search continues on the lower half of the
# array; if the target value is greater than the middle element, then the search continues on the upper half of the
# array. Once the search has narrowed down to one element, the search is complete.
# ======================================================================================================================

# Use Binary search to find a value in supplied list.
# @param [Array<Integer>] list List to search.
# @param [Integer] item Item to search for.
# @return [Integer] index of item in list, -1 if not found.
def binary_search(list, item)
  upper_bound = list.length
  lower_bound = 0
  mid = 0

  until lower_bound == upper_bound
    mid = (upper_bound + lower_bound) / 2
    break if list[mid] == item

    upper_bound = mid if list[mid] > item
    lower_bound = mid + 1 if list[mid] < item
  end

  list[mid] == item ? mid : -1
end

# @type [Array<Integer>]
list = []
26.times { list << rand(1..100) }
list.sort!

search_value = list[rand(0..list.length)]

puts "List to search : #{list}"
puts "Value to search: #{search_value}"

position = binary_search(list, search_value)

puts "Value found at : #{position}"
puts "Value at pos   : #{list[position]}"
