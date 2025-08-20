#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

/**
 * CSV Difference Processor
 * 
 * This utility removes rows from a larger CSV file that exist in a smaller CSV file,
 * creating a new file with the remaining rows.
 * 
 * Usage:
 *   node csv_diff_processor.js <smaller_file.csv> <larger_file.csv> <output_file.csv>
 * 
 * Arguments:
 *   - smaller_file.csv: The CSV file with fewer rows (reference file)
 *   - larger_file.csv: The CSV file with more rows (file to filter)
 *   - output_file.csv: The output file that will contain the difference
 */

class CSVDiffProcessor {
    constructor() {
        this.smallerFileData = [];
        this.largerFileData = [];
        this.headers = [];
    }

    /**
     * Read and parse a CSV file
     * @param {string} filePath - Path to the CSV file
     * @returns {Promise<Array>} Array of row objects
     */
    async readCSV(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            const headers = [];
            let isFirstRow = true;

            fs.createReadStream(filePath)
                .pipe(parse({ 
                    delimiter: ',',
                    columns: true,
                    skip_empty_lines: true,
                    trim: true
                }))
                .on('data', (data) => {
                    if (isFirstRow) {
                        Object.keys(data).forEach(header => headers.push(header));
                        isFirstRow = false;
                    }
                    results.push(data);
                })
                .on('end', () => {
                    console.log(`✅ Successfully read ${results.length} rows from ${filePath}`);
                    resolve({ data: results, headers });
                })
                .on('error', (error) => {
                    console.error(`❌ Error reading ${filePath}:`, error.message);
                    reject(error);
                });
        });
    }

    /**
     * Write data to a CSV file
     * @param {string} filePath - Output file path
     * @param {Array} data - Array of row objects
     * @param {Array} headers - Array of column headers
     * @returns {Promise<void>}
     */
    async writeCSV(filePath, data, headers) {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(filePath);
            const stringifier = stringify({
                header: true,
                columns: headers
            });

            stringifier.pipe(output);

            data.forEach(row => {
                stringifier.write(row);
            });

            stringifier.end();

            output.on('finish', () => {
                console.log(`✅ Successfully wrote ${data.length} rows to ${filePath}`);
                resolve();
            });

            output.on('error', (error) => {
                console.error(`❌ Error writing to ${filePath}:`, error.message);
                reject(error);
            });
        });
    }

    /**
     * Convert a row object to a string for comparison
     * @param {Object} row - Row object
     * @returns {string} String representation of the row
     */
    rowToString(row) {
        // Sort keys to ensure consistent comparison regardless of property order
        const sortedKeys = Object.keys(row).sort();
        return sortedKeys.map(key => row[key] || '').join('|');
    }

    /**
     * Process the CSV files and create the difference
     * @param {string} smallerFile - Path to the smaller CSV file
     * @param {string} largerFile - Path to the larger CSV file
     * @param {string} outputFile - Path to the output CSV file
     */
    async process(smallerFile, largerFile, outputFile) {
        try {
            console.log('🚀 Starting CSV difference processing...');
            console.log(`📄 Smaller file: ${smallerFile}`);
            console.log(`📄 Larger file: ${largerFile}`);
            console.log(`📄 Output file: ${outputFile}`);
            console.log('');

            // Validate input files exist
            if (!fs.existsSync(smallerFile)) {
                throw new Error(`Smaller file does not exist: ${smallerFile}`);
            }
            if (!fs.existsSync(largerFile)) {
                throw new Error(`Larger file does not exist: ${largerFile}`);
            }

            // Read both CSV files
            console.log('📖 Reading CSV files...');
            const smallerResult = await this.readCSV(smallerFile);
            const largerResult = await this.readCSV(largerFile);

            const smallerData = smallerResult.data;
            const largerData = largerResult.data;
            const headers = largerResult.headers; // Use headers from larger file

            console.log(`📊 Smaller file contains ${smallerData.length} rows`);
            console.log(`📊 Larger file contains ${largerData.length} rows`);
            console.log('');

            // Create a Set of string representations from the smaller file for fast lookup
            console.log('🔍 Creating lookup index from smaller file...');
            const smallerRowsSet = new Set();
            smallerData.forEach(row => {
                smallerRowsSet.add(this.rowToString(row));
            });

            // Filter the larger file, keeping only rows that don't exist in the smaller file
            console.log('🔄 Filtering larger file...');
            const filteredData = largerData.filter(row => {
                const rowString = this.rowToString(row);
                return !smallerRowsSet.has(rowString);
            });

            const removedCount = largerData.length - filteredData.length;
            console.log(`✂️  Removed ${removedCount} matching rows`);
            console.log(`💾 Remaining ${filteredData.length} rows for output`);
            console.log('');

            // Write the filtered data to the output file
            console.log('💾 Writing output file...');
            await this.writeCSV(outputFile, filteredData, headers);

            console.log('');
            console.log('🎉 CSV difference processing completed successfully!');
            console.log(`📈 Summary:`);
            console.log(`   - Original rows in larger file: ${largerData.length}`);
            console.log(`   - Rows removed (found in smaller file): ${removedCount}`);
            console.log(`   - Rows remaining in output: ${filteredData.length}`);
            console.log(`   - Output saved to: ${outputFile}`);

        } catch (error) {
            console.error('❌ Error during processing:', error.message);
            process.exit(1);
        }
    }
}

// CLI execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length !== 3) {
        console.log('📖 CSV Difference Processor');
        console.log('');
        console.log('Usage:');
        console.log('  node csv_diff_processor.js <smaller_file.csv> <larger_file.csv> <output_file.csv>');
        console.log('');
        console.log('Arguments:');
        console.log('  smaller_file.csv  - The CSV file with fewer rows (reference file)');
        console.log('  larger_file.csv   - The CSV file with more rows (file to filter)');
        console.log('  output_file.csv   - The output file that will contain the difference');
        console.log('');
        console.log('Example:');
        console.log('  node csv_diff_processor.js data_88_rows.csv data_132_rows.csv filtered_output.csv');
        process.exit(1);
    }

    const [smallerFile, largerFile, outputFile] = args;
    const processor = new CSVDiffProcessor();
    processor.process(smallerFile, largerFile, outputFile);
}

module.exports = CSVDiffProcessor;