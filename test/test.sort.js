describe('Sort', function() {

  var list, i1, i2, i3, i4, i5, i6;

  beforeEach(function() {
    list = fixture.list(['id'], [
      { id: "1", val: "" },
      { id: "2", val: "" },
      { id: "3", val: "" },
      { id: "4", val: "" },
      { id: "5", val: "" },
      { id: "6", val: "" }
    ]);
    i1 = list.get('id', '1')[0];
    i2 = list.get('id', '2')[0];
    i3 = list.get('id', '3')[0];
    i4 = list.get('id', '4')[0];
    i5 = list.get('id', '5')[0];
    i6 = list.get('id', '6')[0];
  });

  afterEach(function() {
    fixture.removeList();
  });

  describe('Basics', function() {
    it('should sort letters asc', function() {
      i1.values({ val: "b" });
      i2.values({ val: "a" });
      i3.values({ val: "c" });
      i4.values({ val: "z" });
      i5.values({ val: "s" });
      i6.values({ val: "y" });
      list.sort('val');
      expect(list.items[0].values().val).to.be.equal("a");
      expect(list.items[1].values().val).to.be.equal("b");
      expect(list.items[2].values().val).to.be.equal("c");
      expect(list.items[3].values().val).to.be.equal("s");
      expect(list.items[4].values().val).to.be.equal("y");
      expect(list.items[5].values().val).to.be.equal("z");
    });
    it('should sort letters desc', function() {
      i1.values({ val: "b" });
      i2.values({ val: "a" });
      i3.values({ val: "c" });
      i4.values({ val: "z" });
      i5.values({ val: "s" });
      i6.values({ val: "y" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).to.be.equal("z");
      expect(list.items[1].values().val).to.be.equal("y");
      expect(list.items[2].values().val).to.be.equal("s");
      expect(list.items[3].values().val).to.be.equal("c");
      expect(list.items[4].values().val).to.be.equal("b");
      expect(list.items[5].values().val).to.be.equal("a");
    });
    it('should sort åäö desc', function() {
      list.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖabcdefghijklmnopqrstuvxyzåäö';
      i1.values({ val: "a" });
      i2.values({ val: "å" });
      i3.values({ val: "ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "o" });
      i6.values({ val: "s" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).to.be.equal("ö");
      expect(list.items[1].values().val).to.be.equal("ä");
      expect(list.items[2].values().val).to.be.equal("å");
      expect(list.items[3].values().val).to.be.equal("s");
      expect(list.items[4].values().val).to.be.equal("o");
      expect(list.items[5].values().val).to.be.equal("a");
    });
    it('should sort åäö asc', function() {
      list.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZÅÄÖabcdefghijklmnopqrstuvxyzåäö';
      i1.values({ val: "a" });
      i2.values({ val: "å" });
      i3.values({ val: "ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "o" });
      i6.values({ val: "s" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("a");
      expect(list.items[1].values().val).to.be.equal("o");
      expect(list.items[2].values().val).to.be.equal("s");
      expect(list.items[3].values().val).to.be.equal("å");
      expect(list.items[4].values().val).to.be.equal("ä");
      expect(list.items[5].values().val).to.be.equal("ö");
    });
    it('should sort åäö desc case insensitive', function() {
      list.alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö';
      i1.values({ val: "a" });
      i2.values({ val: "Å" });
      i3.values({ val: "ä" });
      i4.values({ val: "Ö" });
      i5.values({ val: "o" });
      i6.values({ val: "S" });
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).to.be.equal("Ö");
      expect(list.items[1].values().val).to.be.equal("ä");
      expect(list.items[2].values().val).to.be.equal("Å");
      expect(list.items[3].values().val).to.be.equal("S");
      expect(list.items[4].values().val).to.be.equal("o");
      expect(list.items[5].values().val).to.be.equal("a");
    });
    it('should sort åäö asc case insensitive', function() {
      list.alphabet = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö';
      i1.values({ val: "A" });
      i2.values({ val: "å" });
      i3.values({ val: "Ä" });
      i4.values({ val: "ö" });
      i5.values({ val: "O" });
      i6.values({ val: "s" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("A");
      expect(list.items[1].values().val).to.be.equal("O");
      expect(list.items[2].values().val).to.be.equal("s");
      expect(list.items[3].values().val).to.be.equal("å");
      expect(list.items[4].values().val).to.be.equal("Ä");
      expect(list.items[5].values().val).to.be.equal("ö");
    });
    it('should handle case-insensitive by default', function() {
      i1.values({ val: "e" });
      i2.values({ val: "b" });
      i4.values({ val: "F" });
      i3.values({ val: "D" });
      i5.values({ val: "A" });
      i6.values({ val: "C" });
      list.sort('val');
      expect(list.items[0].values().val).to.be.equal("A");
      expect(list.items[1].values().val).to.be.equal("b");
      expect(list.items[2].values().val).to.be.equal("C");
      expect(list.items[3].values().val).to.be.equal("D");
      expect(list.items[4].values().val).to.be.equal("e");
      expect(list.items[5].values().val).to.be.equal("F");
    });
    it('should disable insensitive', function() {
      i1.values({ val: "e" });
      i2.values({ val: "b" });
      i4.values({ val: "F" });
      i3.values({ val: "D" });
      i5.values({ val: "A" });
      i6.values({ val: "C" });
      list.sort('val', { insensitive: false });
      expect(list.items[0].values().val).to.be.equal("A");
      expect(list.items[1].values().val).to.be.equal("C");
      expect(list.items[2].values().val).to.be.equal("D");
      expect(list.items[3].values().val).to.be.equal("F");
      expect(list.items[4].values().val).to.be.equal("b");
      expect(list.items[5].values().val).to.be.equal("e");
    });
    it('should sort dates', function() {
      i1.values({ val: "2008-12-10" });
      i2.values({ val: "2008-11-10" });
      i3.values({ val: "2007-11-10" });
      i4.values({ val: "2009-12-10" });
      i5.values({ val: "2007-01-4" });
      i6.values({ val: "2006-12-10" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("2006-12-10");
      expect(list.items[1].values().val).to.be.equal("2007-01-4");
      expect(list.items[2].values().val).to.be.equal("2007-11-10");
      expect(list.items[3].values().val).to.be.equal("2008-11-10");
      expect(list.items[4].values().val).to.be.equal("2008-12-10");
      expect(list.items[5].values().val).to.be.equal("2009-12-10");
    });
    it('should sort file names (a bit wrong)', function() {
      i1.values({ val: "car.mov" });
      i2.values({ val: "01alpha.sgi" });
      i3.values({ val: "001alpha.sgi" });
      i4.values({ val: "my.string_41299.tif" });
      i5.values({ val: "0003.zip" });
      i6.values({ val: "0002.asp" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("01alpha.sgi");
      expect(list.items[1].values().val).to.be.equal("001alpha.sgi");
      expect(list.items[2].values().val).to.be.equal("0002.asp");
      expect(list.items[3].values().val).to.be.equal("0003.zip");
      expect(list.items[4].values().val).to.be.equal("car.mov");
      expect(list.items[5].values().val).to.be.equal("my.string_41299.tif");
    });
    it('should show order of sorted floates (a bit wrong)', function() {
      i1.values({ val: "10.0401" });
      i2.values({ val: "10.022" });
      i3.values({ val: "10.021999" });
      i4.values({ val: "11.231" });
      i5.values({ val: "0003.123" });
      i6.values({ val: "09.2123" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("0003.123");
      expect(list.items[1].values().val).to.be.equal("09.2123");
      expect(list.items[2].values().val).to.be.equal("10.022");
      expect(list.items[3].values().val).to.be.equal("10.0401");
      expect(list.items[4].values().val).to.be.equal("10.021999");
      expect(list.items[5].values().val).to.be.equal("11.231");
    });
    it('should sort IP addresses', function() {
      i1.values({ val: "192.168.1.1" });
      i2.values({ val: "192.168.0.100" });
      i3.values({ val: "192.168.0.1" });
      i4.values({ val: "192.168.1.3" });
      i5.values({ val: "127.0.0.1" });
      i6.values({ val: "192.168.1.2" });
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("127.0.0.1");
      expect(list.items[1].values().val).to.be.equal("192.168.0.1");
      expect(list.items[2].values().val).to.be.equal("192.168.0.100");
      expect(list.items[3].values().val).to.be.equal("192.168.1.1");
      expect(list.items[4].values().val).to.be.equal("192.168.1.2");
      expect(list.items[5].values().val).to.be.equal("192.168.1.3");
    });
    it('should not break with weird values', function() {
      i1.values({ val: undefined });
      i2.values({ val: null });
      i3.values({ val: 0 });
      i4.values({ val: function() {} });
      i5.values({ val: { foo: "bar" } });

      expect(list.sort).withArgs('val').to.not.throwException();
      expect(list.sort).withArgs('val').to.not.throwException();
      expect(list.sort).withArgs('val').to.not.throwException();
      expect(list.sort).withArgs('val').to.not.throwException();
      expect(list.sort).withArgs('val').to.not.throwException();
      expect(list.sort).withArgs('val').to.not.throwException();
    });
    it('should handle values from issue 387', function() {
        i1.values({ val: 'Test' });
        i2.values({ val: 'Test1Test2' });
        i3.values({ val: 'Bill-To Phone1 Extension' });
        i4.values({ val: "z" });
        i5.values({ val: "s" });
        i6.values({ val: "y" });
        list.sort('val', { order: 'asc' });
        expect(list.items[0].values().val).to.be.equal('Bill-To Phone1 Extension');
        expect(list.items[1].values().val).to.be.equal('s');
        expect(list.items[2].values().val).to.be.equal('Test');
        expect(list.items[3].values().val).to.be.equal('Test1Test2');
        expect(list.items[4].values().val).to.be.equal('y');
        expect(list.items[5].values().val).to.be.equal('z');
    });

    xit('should show how random values are sorted', function() {
      list.add({ id: '7', val: "" });
      list.add({ id: '8', val: "" });
      list.add({ id: '9', val: "" });
      list.add({ id: '10', val: "" });
      list.add({ id: '11', val: "" });
      list.add({ id: '12', val: "" });

      var i7 = list.get('id', '7')[0],
        i8 = list.get('id', '8')[0],
        i9 = list.get('id', '9')[0],
        i10 = list.get('id', '10')[0],
        i11 = list.get('id', '11')[0],
        i12 = list.get('id', '12')[0];

      i1.values({ val: undefined });
      i2.values({ val: "" });
      i3.values({ val: null });
      i4.values({ val: "a" });
      i5.values({ val: "0" });
      i6.values({ val: true });
      i7.values({ val: 0 });
      i8.values({ val: "z" });
      i9.values({ val: "!" });
      i10.values({ val: "?" });
      i11.values({ val: 100 });
      i12.values({ val: false });

      list.sort('val', { order: "asc" });
      list.sort('val', { order: "desc" });
      list.sort('val', { order: "asc" });

      expect(list.items[0].values().val).to.be.equal("");
      expect(list.items[1].values().val).to.be.equal("!");
      expect(list.items[2].values().val).to.be.equal(0);
      expect(list.items[3].values().val).to.be.equal("0");
      expect(list.items[4].values().val).to.be.equal(100);
      expect(list.items[5].values().val).to.be.equal("?");
      expect(list.items[6].values().val).to.be.equal("a");
      expect(list.items[7].values().val).to.be.equal(false);
      expect(list.items[8].values().val).to.be.equal(null);
      expect(list.items[9].values().val).to.be.equal(true);
      expect(list.items[10].values().val).to.be.equal(undefined);
      expect(list.items[11].values().val).to.be.equal("z");
    });

    it('should handle not longer (since 1.4.0) space and zero the same for desc and asc', function() {
      list.clear();
      list.add({ val: "" });
      list.add({ val: "0" });
      list.add({ val: 0 });

      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("");
      expect(list.items[1].values().val).to.be.equal("0");
      expect(list.items[2].values().val).to.be.equal(0);
      list.sort('val', { order: "desc" });
      expect(list.items[0].values().val).to.be.equal("0");
      expect(list.items[1].values().val).to.be.equal(0);
      expect(list.items[2].values().val).to.be.equal("");
      list.sort('val', { order: "asc" });
      expect(list.items[0].values().val).to.be.equal("");
      expect(list.items[1].values().val).to.be.equal("0");
      expect(list.items[2].values().val).to.be.equal(0);
    });

  });

  describe('Custom sort function', function() {
    it('should use custom sort option', function() {
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val', {
        sortFunction: function(itemA, itemB, options) {
          return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
        }
      });
      expect(list.items[0].values().val).to.be.equal("<input value='a' />");
      expect(list.items[1].values().val).to.be.equal("<input value='b' />");
      expect(list.items[2].values().val).to.be.equal("<input value='c' />");
      expect(list.items[3].values().val).to.be.equal("<input value='s' />");
      expect(list.items[4].values().val).to.be.equal("<input value='y' />");
      expect(list.items[5].values().val).to.be.equal("<input value='z' />");
    });
    it('should use default custom sort function', function() {
      list.sortFunction = function(itemA, itemB, options) {
        return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
      };
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val');
      expect(list.items[0].values().val).to.be.equal("<input value='a' />");
      expect(list.items[1].values().val).to.be.equal("<input value='b' />");
      expect(list.items[2].values().val).to.be.equal("<input value='c' />");
      expect(list.items[3].values().val).to.be.equal("<input value='s' />");
      expect(list.items[4].values().val).to.be.equal("<input value='y' />");
      expect(list.items[5].values().val).to.be.equal("<input value='z' />");
    });
    it('should use default custom sort function with order desc', function() {
      list.sortFunction = function(itemA, itemB, options) {
        return list.utils.naturalSort($(itemA.values()[options.valueName]).val(), $(itemB.values()[options.valueName]).val());
      };
      i1.values({ val: "<input value='b' />" });
      i2.values({ val: "<input value='a' />" });
      i3.values({ val: "<input value='c' />" });
      i4.values({ val: "<input value='z' />" });
      i5.values({ val: "<input value='s' />" });
      i6.values({ val: "<input value='y' />" });
      list.sort('val', { order: "desc"});
      expect(list.items[0].values().val).to.be.equal("<input value='z' />");
      expect(list.items[1].values().val).to.be.equal("<input value='y' />");
      expect(list.items[2].values().val).to.be.equal("<input value='s' />");
      expect(list.items[3].values().val).to.be.equal("<input value='c' />");
      expect(list.items[4].values().val).to.be.equal("<input value='b' />");
      expect(list.items[5].values().val).to.be.equal("<input value='a' />");
    });
  });

});
